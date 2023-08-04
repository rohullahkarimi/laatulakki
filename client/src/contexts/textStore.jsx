import React, { createContext, useContext, useState } from "react";

const TextStoreContext = createContext({});

export const TextStoreProvider = (props) => {
  const [textFrontLeft, setTextFrontLeft] = useState("Text Here");
  const [textFrontRight, setTextFrontRight] = useState("Text Here");
  const [textBack, setTextBack] = useState("Text Here");
  const [font, setFont] = useState("/Fonts/textType1.json");

  return (
    <TextStoreContext.Provider
      value={{
        textFrontLeft,
        setTextFrontLeft,
        textFrontRight,
        setTextFrontRight,
        textBack,
        setTextBack,
        font,
        setFont,
      }}
    >
      {props.children}
    </TextStoreContext.Provider>
  );
};

export const useTextStore = () => {
  const context = useContext(TextStoreContext);
  return context;
};