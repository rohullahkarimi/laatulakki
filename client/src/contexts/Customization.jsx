import React from 'react'; // Make sure you have this import
import { createContext, useContext, useState } from "react";



const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  
  const [customization, setCustomization] = useState({
    badge: "fi",
    roundRibbonColor: "",
    cordColor: "black",
    embroidery: {
      embroideryTextColor: "gold",
      embroideryTextFront: { left: "", right: "" },
      embroideryTextBack: "",
      embroideryFont: "kauno",
    },
    size: "",
    quantity: 1,
    productStorage: "",
    focus: "",
  });
  
  const [prices, setPrices] = useState({
    badge: 0,
    roundRibbonColor: 0,
    cordColor: 0,
    embroideryTextFront: 0,
    embroideryTextBack: 0,
  });
  

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        setCustomization,
        prices,
        setPrices,
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};