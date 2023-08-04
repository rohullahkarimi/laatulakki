
import React from 'react'; // Make sure you have this import
import Experience from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import "../common/css/yolakki.css"
import Configurator from "../components/Configurator";
import { CustomizationProvider } from "../contexts/Customization";
import styled from "styled-components";
import { mobile, smallLaptop, smartPhone } from "../responsive";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";



const CapMainDiv = styled.div`
    height: 100%;
`  
const MainDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    ${smallLaptop({padding: "20px", flexDirection: "column"})}
    ${smartPhone({padding: "10px", flexDirection: "column"})}
    ${mobile({padding: "10px", flexDirection: "column"})}
`
const CanvasDiv = styled.div`
    flex: 10;
    height: 100%;
    position: relative;
    width: 100%;

    canvas {
        width: 100% !important;
        height: 100% !important;
    }
`
const OptionsDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    padding-bottom: 5px;
    height: 100%;
    width: 100%;
    background: #fbfbfb;
    ${smallLaptop({order: 1})}
`




const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const LoaderText = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
  
const FullscreenButton = styled.button`
  display: none;
  ${smallLaptop({display: "block"})}
`;



const Chair = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [optionsDivDisplay, setOptionsDivDisplay] = useState("flex");
    

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Simulating a delay of 3 seconds
    
        return () => clearTimeout(timer);
    }, []);

      
    const toggleFullscreen = () => {
        console.log(isFullscreen)
        setIsFullscreen((prevFullscreen) => !prevFullscreen);
        setOptionsDivDisplay((prevDisplay) => (prevDisplay === "flex" ? "none" : "flex"));
    

    };


  return (
    <CustomizationProvider>
        <CapMainDiv>
            <Navbar/>
            <MainDiv>
                <CanvasDiv style={{ position: "relative" }}>
                    {isLoading && (
                        <LoaderOverlay>
                            <LoaderText>Loading...</LoaderText>
                        </LoaderOverlay>
                    )}
                    <Canvas  ref={canvasRef}>
                        <color attach="background" args={["#e6e6e6"]} />
                        <fog attach="fog" args={["#e6e6e6", 10, 20]} />
                        <Experience/>
                    </Canvas>
                    <FullscreenButton onClick={toggleFullscreen} style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}>
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </FullscreenButton>
                
                </CanvasDiv>
                <OptionsDiv id="options-div" style={{ display: optionsDivDisplay }}>
                    <Configurator/>
                </OptionsDiv>
            </MainDiv>
            <Footer/>
     
        </CapMainDiv>
    </CustomizationProvider>
  )
}

export default Chair