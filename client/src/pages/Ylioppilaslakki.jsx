
import React from 'react'; // Make sure you have this import
import ExperienceYlioppilaslakki from "../components/Experience_ylioppilaslakki";
import { Canvas } from "@react-three/fiber";
import "../common/css/yolakki.css"
import Configurator from "../components/Configurator";
import { CustomizationProvider } from "../contexts/Customization";
import styled from "styled-components";
import { laptop, largeLaptop, mobile, smallLaptop, smartPhone, tablet } from "../responsive";
import { Fullscreen, FullscreenExit, ThreeDRotationOutlined } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";



const CapMainDiv = styled.div`
    height: 100%;
`  
const MainDiv = styled.div`
    display: flex;
    /*
    overflow-y: auto;
    align-items: center;
    justify-content: center;
    */
    
    background: #E6E6E6;
    height: ${(props) => (props.fullHeight ? "90%" : "auto")};
    ${laptop({height: "auto"})}
    ${smallLaptop({height: "auto", flexDirection: "column"})}
    ${smartPhone({ flexDirection: "column"})}
    ${mobile({flexDirection: "column"})}
`
const CanvasDiv = styled.div`
    position: relative;
    flex: 12;
    height: auto; 
    width: 100%; 

    

    canvas {
        width: 100% !important; 
        height: auto; /* Set an explicit height value */
        ${largeLaptop({ height: "1200px !important"})}
        ${laptop({ height: "1100px !important"})}
        ${smallLaptop({ height: "800px !important"})}
        ${tablet({ height: "700px !important"})}
        ${smartPhone({ height: "600px !important"})}
        ${mobile({ height: "500px !important"})}
    }
    
`
const OptionsDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 6;
  
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
  
const FullscreenButton = styled.div`
  display: none;
  ${smallLaptop({display: "block"})}
`;



const Ylioppilaslakki = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [optionsDivDisplay, setOptionsDivDisplay] = useState("flex");
    const [fullHeight, setFullHeight] = useState(false);
    

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Simulating a delay of 3 seconds
    
        return () => clearTimeout(timer);
    }, []);

      
    const toggleFullscreen = () => {
        console.log(isFullscreen)
        setIsFullscreen((prevFullscreen) => !prevFullscreen);
        if (optionsDivDisplay === "flex") {
          setOptionsDivDisplay("none");
          setFullHeight(true);
        } else {
          setOptionsDivDisplay("flex");
          setFullHeight(false);
        }
    

    };



  return (
    <CustomizationProvider>
        <CapMainDiv>
            <Navbar/>
            <MainDiv fullHeight={fullHeight}>
                <CanvasDiv style={{ position: "relative" }}>
                    {isLoading && (
                        <LoaderOverlay>
                            <LoaderText>Loading the model...</LoaderText>
                        </LoaderOverlay>
                    )}

            
                    <ThreeDRotationOutlined style={{ position: "absolute", top: 4, right: 4, zIndex: 1, fontSize: "32px" }}/>
                   
                    <Canvas  ref={canvasRef}  >
                        <color attach="background" args={["#e6e6e6"]} />
                        <fog attach="fog" args={["#e6e6e6", 10, 20]} />
                        <ExperienceYlioppilaslakki/>
                    </Canvas>
                    <FullscreenButton onClick={toggleFullscreen} style={{ position: "absolute", bottom: 4, right: 4, zIndex: 1 }}>
                        {isFullscreen ? <FullscreenExit/> : <Fullscreen/>}
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

export default Ylioppilaslakki