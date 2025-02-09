import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core';

export const useUserNameStore = defineStore("user", {
  state: () => ({
    userName: useStorage("userName", "GuestUser"), 
  }),
  actions: {
    setUserName(name) {
      this.userName = name;
    },
    clearUserName() {
      this.userName = "GuestUser";
    },
  },
});
