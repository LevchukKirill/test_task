<script setup>
import { nextTick, ref, watch } from "vue";
import { useStore } from "@/store/store.js";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "../assets/base.css";

const store = useStore();
const msg = ref("");
let user = ref({});
const scroller = ref();

watch(
  store.messagesList,
  async function scrollBottom() {
    if (!scroller.value) return;

    const { scrollTop, scrollHeight, clientHeight } = scroller.value.$el;
    if (Math.abs(scrollTop - (scrollHeight - clientHeight)) > 4) return;

    await nextTick();
    scroller.value.scrollToBottom();
  },
  { flush: "pre" },
);
function clickHandler() {
  if (store.userName) {
    store.message = msg.value;
    store.sendMessage();
    console.log(store.userName);
  } else {
    store.message = msg.value;
    store.connectToChat();
    console.log("new client connected to chat", store.userName);
  }

  msg.value = "";
}
</script>

<template>
  <div class="container">
    <div class="chat">
      <div class="msgList">
        <DynamicScroller
          class="scroller"
          v-if="store.messagesList.length"
          min-item-size="36"
          :items="store.messagesList"
          ref="scroller"
        >
          <template #default="{ item, index: idx, active }">
            <DynamicScrollerItem
              :item="item"
              :size-dependencies="[item.author, item.message]"
              :active="active"
              :data-index="idx"
              class="message"
              list-tag="ul"
              item-tag="li"
            >
              {{ item.author }}: {{ item.message }}
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
        <div class="scroller" v-else>Сообщений пока нет...</div>
      </div>
      <div class="input">
        <textarea
          id="input"
          placeholder="Введите свое сообщение"
          v-model="msg"
          class="input-msg"
          cols="60"
          row="6"
        />
        <button @click="clickHandler" class="btn">
          <div style="font-weight: 600">Отправить</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-msg {
  resize: none;
  scrollbar-width: thin;
  scrollbar-color: rgb(0, 189, 126) rgba(0, 189, 126, 0.1);
  padding: 10px;
  margin: 2px 2px;
  width: 90%;
  border-bottom-left-radius: 22px;
  border: 0px;
  background-color: rgb(24, 24, 24);
  color: white;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
}
.chat {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 300px;
  border-radius: 20px;
  min-width: 400px;
  border: 1px solid rgba(0, 189, 126, 0.1);
}
.input {
  word-break: break-word;
  display: flex;
  flex-direction: row;
  height: 30%;
}
.btn {
  margin: 1px;
  background: rgba(0, 189, 126, 0.1);
  width: 16%;
  color: rgb(0, 189, 126);
  border-bottom-right-radius: 20px;
  font-weight: 500;
  font-size: 1rem;
}
.message {
  border-radius: 10px;
  background: rgba(0, 189, 126, 0.1);
  font-weight: 500;
  color: rgb(0, 189, 126);
  padding: 5px 15px;
  border: 3px solid var(--color-background);
  word-break: break-word;
}
.msgList {
  gap: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  border-bottom: 1px solid rgba(0, 189, 126, 0.1);
}
.scroller {
  /*margin-bottom: 5px;*/
  padding: 10px;
  scrollbar-color: rgb(0, 189, 126) rgba(0, 189, 126, 0.1);
  scrollbar-width: thin;
}
</style>
