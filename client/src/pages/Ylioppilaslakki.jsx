
import React from 'react'; // Make sure you have this import
import ExperienceYlioppilaslakki from "../components/Experience_ylioppilaslakki";
import { Canvas } from "@react-three/fiber";
import "../common/css/yolakki.css"
import Configurator from "../components/Configurator";
import { CustomizationProvider } from "../contexts/Customization";
import styled from "styled-components";
import { laptop, largeLaptop, mobile, smallLaptop, smartPhone, tablet } from "../responsive";
import { ThreeDRotationOutlined, ZoomInOutlined, ZoomOutOutlined } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { t } from 'i18next';
import $ from "jquery"
import ReactDOM from "react-dom";
import BounceLoader from 'react-spinners/ClipLoader';



// globar variables
var forceRerender = false;
var fullScreenStatus = false;
var optionsDivDisplay = "flex";

const toggleFullscreen = () => {

  if (optionsDivDisplay === "flex") {
    optionsDivDisplay = "none";
    fullScreenStatus = true;
    forceRerender = true;
    $("#canvasDiv canvas").removeAttr("style")
    $("#canvasDiv canvas").attr('style', 'height: 70vh !important;display: block;');
    $("#options-div").attr('style', 'display: none;');
    ReactDOM.render(<ZoomOutOutlined />, document.getElementById("zoomContainer"));
    

   
  } else {
    ReactDOM.render(<ZoomInOutlined />, document.getElementById("zoomContainer"));
    optionsDivDisplay = "flex";
    fullScreenStatus = false;
    forceRerender = true;
    $("#options-div").attr('style', 'display: flex;');

    // Check device width and set canvas height accordingly
    if (window.innerWidth < 390) {
      $("#canvasDiv canvas").attr('style', 'height: 240px !important; display: block;');
    } else if (window.innerWidth < 600) {
      $("#canvasDiv canvas").attr('style', 'height: 270px !important;display: block;');
    } else if (window.innerWidth < 800) {
      $("#canvasDiv canvas").attr('style', 'height: 550px !important;display: block;');
    } else if (window.innerWidth < 950) {
      $("#canvasDiv canvas").attr('style', 'height: 500px !important;display: block;');
    } else if (window.innerWidth < 1200) {
      $("#canvasDiv canvas").attr('style', 'height: 600px !important;display: block;');
    } else if (window.innerWidth < 1800) {
      $("#canvasDiv canvas").attr('style', 'height: 650px !important;display: block;');
    }
  }
};


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
    max-width: 100%;
    max-height: 100%;
  }  

  // Position sticky on mobile
  @media (max-width: 600px) {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: white; // Change this to match your desired background color
    /* pointer-events: none; */
  }
`;
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


    console.log(forceRerender)
    useEffect(() => {
      if (forceRerender) {
        console.log("force rendering is on")
        forceRerender = false;
      }else{
        console.log("force rendering is off")
      }
    }, []);
  
   

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Simulating a delay of 3 seconds
    
        return () => clearTimeout(timer);
    }, []);

      



    
  return (
    <CustomizationProvider>
        <CapMainDiv>
            <NavbarDesktop>
                <Navbar />
            </NavbarDesktop>
            <MainDiv>
                <CanvasDiv  id="canvasDiv">
                    <NavbarMobile>
                        <Navbar />
                    </NavbarMobile>
                    {isLoading && (
                        <LoaderOverlay>
                            <BounceLoader color="#36d7b7" size={60}/>
                        </LoaderOverlay>
                    )}

            
                    <ThreeDRotationOutlined style={{ position: "absolute", bottom: 52, left: 10, zIndex: 1, fontSize: "30px" }}/>
                    
                    <CanvasToMiddle>
                        <Canvas  ref={canvasRef}>
                            <color attach="background" args={["#e6e6e6"]} />
                            <fog attach="fog" args={["#e6e6e6", 10, 20]} />
                            <ExperienceYlioppilaslakki/>
                        </Canvas>
                    </CanvasToMiddle>
                    <NavbarMobile>
                        <TextSlider>{t('3dText')}</TextSlider>
                    </NavbarMobile>


                    <FullscreenButton id="zoomContainer" onClick={toggleFullscreen} style={{ position: "absolute", bottom: 55, right: 10, zIndex: 1, fontSize: "30px" }}>
                        <ZoomInOutlined/>
                    </FullscreenButton>

                   
                
                </CanvasDiv>
              
                <OptionsDiv id="options-div">
                    <Configurator/>
                </OptionsDiv>
            </MainDiv>
      
            <Footer/>
            
        </CapMainDiv>
    </CustomizationProvider>
  )
}

export default Ylioppilaslakki