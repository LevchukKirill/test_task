<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import DynamicBox from "@/components/DynamicBox.vue";
import Chat from "@/components/Chat.vue";

import { ref } from "vue";
import Modal from "@/components/Modal.vue";
const messagesData = ref([]);
</script>

<template>
  <header>
    <hello-world msg="Тестовое задание"></hello-world>
  </header>

  <main>
    <div class="center">
      <modal></modal>
      <dynamic-box></dynamic-box>
      <chat v-model:messages="messagesData"></chat>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.center {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  gap: 20px;
}
</style>
