// src/stores/contactChat.js
import { defineStore } from "pinia";

export const useContactChatStore = defineStore("contactChat", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
