
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
import { t } from 'i18next';



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



const CanvasToMiddle = styled.div`
    display: flex;
    overflow-y: auto;
    align-items: center;
    justify-content: center;
`

const CanvasDiv = styled.div`
    position: relative;
    flex: 12;
    height: auto; 
    width: 100%; 

    

    canvas {
        /* Add a max-width to maintain the aspect ratio */
        max-width: 100%;
        /* Set the max-height to prevent the canvas from growing too large */
        max-height: 100%;
        ${largeLaptop({ height: "700px !important", width: "auto !important"})}
        ${laptop({ height: "500px !important"})}
        ${smallLaptop({ height: "550px !important"})}
        ${tablet({ height: "310px !important"})}
        ${smartPhone({ height: "280px !important"})}
        ${mobile({ height: "260px !important"})}
    }
    
    // Position sticky on mobile
    @media (max-width: 600px) {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: white; // Change this to match your desired background color
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

const NavbarDesktop = styled.div`
  display: block;
  @media (max-width: 600px) {
    display: none;
  }
`;

// Navbar for mobile (screen width < 600px)
const NavbarMobile = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

export const TextSlider = styled.div`
    position: sticky;
    bottom: 0;
    z-index: 2;
    background-color: white; // Change this to match your desired background color
    padding: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    height: 45px;
    border: 2px solid #f7f7f7; 
    /* Add flexbox properties for vertical centering */
    display: flex;
    align-items: center;
    justify-content: center;
    ${smartPhone({fontSize: "14px"})}
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
            <NavbarDesktop>
                <Navbar />
            </NavbarDesktop>
            <MainDiv fullHeight={fullHeight}>
                <CanvasDiv>
                    <NavbarMobile>
                        <Navbar />
                    </NavbarMobile>
                    {isLoading && (
                        <LoaderOverlay>
                            <LoaderText>Loading the model...</LoaderText>
                        </LoaderOverlay>
                    )}

            
                    <ThreeDRotationOutlined style={{ position: "absolute", bottom: 52, left: 10, zIndex: 1, fontSize: "30px" }}/>
                    
                    <CanvasToMiddle>
                        <Canvas  ref={canvasRef}  >
                            <color attach="background" args={["#e6e6e6"]} />
                            <fog attach="fog" args={["#e6e6e6", 10, 20]} />
                            <ExperienceYlioppilaslakki/>
                        </Canvas>
                    </CanvasToMiddle>
                    <NavbarMobile>
                        <TextSlider>{t('3dText')}</TextSlider>
                    </NavbarMobile>


                    <FullscreenButton onClick={toggleFullscreen} style={{ position: "absolute", bottom: 55, right: 10, zIndex: 1, fontSize: "30px" }}>
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