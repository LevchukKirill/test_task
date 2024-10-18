<script setup>
import { useStore } from "@/store/store.js";

const circleSize = { x: 16, y: 16 };
const circleOffset = {
  offsetX: circleSize.x / 2,
  offsetY: circleSize.y / 2,
};

const store = useStore();

async function handleCursorMove() {
  store.x = event.offsetX - circleOffset.offsetX;
  store.y = event.offsetY - circleOffset.offsetY;
  store.sendLocation();
}
</script>
<template>
  <div class="container">
    <div @mousemove="handleCursorMove($event)" class="box">
      <div
        class="circle"
        :style="{
          height: circleSize.y + 'px',
          width: circleSize.x + 'px',
          left: store.x + 'px',
          top: store.y + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
}
.box {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  transition: 0.4s;
  background: rgba(0, 189, 126, 0.1);
}
.circle {
  pointer-events: none;
  position: relative;
  border-radius: 50%;
  border: 2px rgb(0, 189, 126) solid;
}
</style>
