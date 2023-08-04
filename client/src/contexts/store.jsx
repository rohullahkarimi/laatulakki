import React, { createContext, useContext, useState } from "react";

const ColorStoreContext = createContext({});

export const ColorStoreProvider = (props) => {
  const [activeColor, setActiveColor] = useState({ hex: "#fff" });

  return (
    <ColorStoreContext.Provider value={{ activeColor, setActiveColor }}>
      {props.children}
    </ColorStoreContext.Provider>
  );
};

export const useColorStore = () => {
  const context = useContext(ColorStoreContext);
  return context;
};
