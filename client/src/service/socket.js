import { io } from "socket.io-client";
export class Gateway {
  url = import.meta.env.VITE_API;

  constructor() {
    this.socket = io(this.url, {
      timeout: 60000,
      reconnectionDelayMax: 60000,
      withCredentials: true,
    });
  }

  newLocation() {
    this.socket.on("newLocation", (location) => {
      store.x = location[0] + 8;
      store.y = location[1] + 8;
    });
  }

  listenNewLocation(cb) {
    this.socket.on("newLocation", cb);
  }

  sendLocation(cords, user) {
    this.socket.emit("sendLocation", cords, user);
  }

  listenNewMessage(cb) {
    this.socket.on("newMessage", cb);
  }

  sendMessage(args) {
    this.socket.emit("sendMessage", args);
  }

  connectToChat(args) {
    return this.socket.emitWithAck("connectToChat", {
      id: this.socket.id,
      ...args,
    });
  }
}
