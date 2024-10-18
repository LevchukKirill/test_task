<script setup>
import { ref } from "vue";
import { useStore } from "@/store/store.js";

const dialog = ref(true);
const user = ref("");
const store = useStore();
async function clickHandler() {
  if (user.value.length !== 0) {
    await store.connectToChat(user.value);
    dialog.value = false;
  }
  // store.userName = ""
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      :persistent="true"
      :model-value="dialog"
      max-width="300"
      min-width="200"
    >
      <v-card id="input" title="Профиль" style="border-radius: 10px">
        <v-card-text>
          <v-text-field
            v-model="user"
            label="Имя пользователя*"
            required
          ></v-text-field>

          <small class="text-caption">*обязательное поле</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none text-btn"
            color="rgba(0, 189, 126, 0.1)"
            text="Войти"
            variant="flat"
            @click="clickHandler"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.text-btn {
  color: rgb(0, 189, 126);
}
</style>
