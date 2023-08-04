// colorStore.js
import { create } from "zustand";

const useColorStore = create((set) => ({
  activeColor: {
    hex: "#ffcd59", // Set the default body color hex code here
    name: "gold"
  },

  setActiveColor: (color) => set({ activeColor: color }),
}));

export { useColorStore };
