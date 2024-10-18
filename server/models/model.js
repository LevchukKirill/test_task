import sequelize from "../db.js";
import { DataTypes } from "sequelize";
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Coords = sequelize.define("coords", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  x: { type: DataTypes.INTEGER },
  y: { type: DataTypes.INTEGER },
  userName: { type: DataTypes.STRING },
});

const Messages = sequelize.define("messages", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING },
});

Coords.User = Coords.belongsTo(User);
User.Coords = User.hasMany(Coords);

Messages.User = Messages.belongsTo(User);
User.Messages = User.hasMany(Messages);

export default { User, Coords, Messages };
