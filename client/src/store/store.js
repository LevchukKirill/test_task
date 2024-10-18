import { defineStore } from "pinia";
import { ref } from "vue";

import { Gateway } from "@/service/socket.js";

export const useStore = defineStore("store", () => {
  const gateway = new Gateway();
  const x = ref(0);
  const y = ref(0);
  const userName = ref("");
  const message = ref("");
  const messagesList = ref([]);

  gateway.listenNewLocation((cords) => {
    [x.value, y.value] = cords;
  });

  gateway.listenNewMessage((message) => {
    messagesList.value.push(message);
    console.log("client ", message);
  });
  function sendLocation() {
    gateway.sendLocation([x.value, y.value], userName.value);
  }

  function sendMessage() {
    gateway.sendMessage({
      id: Date.now(),
      message: message.value,
      author: userName.value,
    });
  }
  function connectToChat(name) {
    gateway
      .connectToChat({
        name,
      })
      .then(() => {
        userName.value = name;
      });
  }
  return {
    x,
    y,
    userName,
    message,
    messagesList,
    sendLocation,
    sendMessage,
    connectToChat,
  };
});
