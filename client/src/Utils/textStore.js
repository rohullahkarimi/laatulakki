import { create } from "zustand";

const useTextStore = create((set) => ({
  textFrontLeft: "Text Here",
  textFrontRight: "Text Here",
  textBack: "Text Here",
  font: "/Fonts/textType1.json", // Default font path
  setTextFrontLeft: (text) => set({ textFrontLeft: text }),
  setTextFrontRight: (text) => set({ textFrontRight: text }),
  setTextBack: (text) => set({ textBack: text }),
  setFont: (font) => set({ font: font }), // Setter for font property
}));

export { useTextStore };
