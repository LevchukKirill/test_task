import express from "express";
import { createServer } from "http";
import cors from "cors";
import sequelize from "./db.js";
import model from "./models/model.js";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import router from "./router.js";
dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: [process.env.ORIGINS], credentials: true },
});

app.use(cors({ origin: process.env.CLIENT }));
app.use(express.json());
app.use(router);

let time = 0;

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    console.log("Поймано", message);
    io.emit("newMessage", message);
  });

  socket.on("sendLocation", async (location, user) => {
    if (time <= Date.now() - 1000) {
      time = Date.now();
      await model.Coords.create({
        x: location[0],
        y: location[1],
        userName: user,
      });
      io.emit("newMessage", {
        author: "LOG",
        id: Date.now(),
        message: `Пользователь ${user} изменил позицию курсора на [${location[0]}, ${location[1]}]`,
      });
    }

    io.emit("newLocation", location);
  });

  socket.on("connectToChat", async (user, cb) => {
    console.log(user.name);
    const existedUser = await model.User.findOne({
      where: { name: user.name },
    });

    if (!existedUser) {
      await model.User.create({
        name: user.name,
      });

      console.log(user.name);
    } else {
      console.log("Пользователь с таким именем уже есть", existedUser);
    }
    io.emit("newUserInChat", user);
    cb();
  });

  io.on("disconnect", () => {});
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    httpServer.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
