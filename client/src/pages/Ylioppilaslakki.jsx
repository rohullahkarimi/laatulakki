
import React from 'react'; // Make sure you have this import
import ExperienceYlioppilaslakki from "../components/Experience_ylioppilaslakki";
import { Canvas } from "@react-three/fiber";
import "../common/css/yolakki.css"
import Configurator from "../components/Configurator";
import { CustomizationProvider } from "../contexts/Customization";
import styled from "styled-components";
import { laptop, mobile, smallLaptop, smartPhone } from "../responsive";
import { ThreeDRotationOutlined, ZoomInOutlined, ZoomOutOutlined } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { t } from 'i18next';
import $ from "jquery"
import ReactDOM from "react-dom";
import BounceLoader from 'react-spinners/ClipLoader';
import {Helmet} from "react-helmet";
import { brandColor } from '../theme';
import RealPictureModal from "../components/RealPictureModal"

import { hotjar } from 'react-hotjar';
import {getCookie} from "../common/js/common.js";
import ReactGA from "react-ga4";
import { publicRequest } from '../requestMethods';
import i18n from '../i18n';








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
    touch-action: none;
    cursor: grab;
    pointer-events: all !important;
    border-bottom: solid 1px #ffcbcb;
  }  

  canvas:active {cursor: grab;}



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
const AnnouncementMobile = styled.div`
  display: none;
  background-color: #1b1b1b;
  @media (max-width: 600px) {
    display: block;
  }
`;

export const TextSlider = styled.div`
    position: sticky;
    bottom: 0;
    z-index: 2;
    background-color: white;
    padding: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    height: 45px;
    border: 2px solid #f7f7f7; 
    /* Add flexbox properties for vertical centering */
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1b1b1b;
    color: white;
    border: none;
    ${smartPhone({fontSize: "16px"})}
`;

const RealPictures = styled.div`
  position: absolute;
  bottom: 52px;
  left: 60px;
  z-index: 1;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid #${brandColor};
`;



const Ylioppilaslakki = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef();
    const [realPictureModalShow, setRrealPictureModalShow] = useState(false);
    const selectedLang = i18n.language
    const [setting, setSetting] = useState({
      "status": false,
      "title": "",
      "desc": "",
    })
  
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

    useEffect(() => {
      // get setting data
      const getSetting = async () => {
        try {
          const res = await publicRequest.get("/setting");
          //console.log(res.data);
          let updatedValue = {};
    
      
    
          const titleArray = res.data[0].offer.title;
          const descArray = res.data[0].offer.desc;
    
          // Find the object in the array that matches the selectedLang
          const titleObj = titleArray.find((item) => item[selectedLang]);
          const descObj = descArray.find((item) => item[selectedLang]);
    
          updatedValue = {
            status: res.data[0].offer.status,
            title: titleObj ? titleObj[selectedLang] : "",
            desc: descObj ? descObj[selectedLang] : "",
          };
    
          setSetting((setting) => ({
            ...setting,
            ...updatedValue,
          }));
        } catch (err) {
          console.log(err);
        }
      };
      getSetting();
    }, [selectedLang]);
    
    const handleRealPictureModal = (event) => {
      event.stopPropagation();
      event.preventDefault();
      setRrealPictureModalShow(true)
    }

  // call hotjar if user accepted preferences cookie
  if(getCookie("rcl_preferences_consent") === "true"){
    hotjar.initialize(3220042, 6)
    hotjar.identify('USER_ID', { userProperty: 'value' });

    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/ylioppilaslakki" });
  } 
    
  return (
    <CustomizationProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edulliset ja Nopeasti Toimitettavat Kustomoidut Ylioppilaslakit | LaatuLakki</title>
        <meta name="description" content="Valitse yksilöllinen ylioppilaslakki Laatulakilta. Meillä saat parhaan laadun edulliseen hintaan ja nopealla toimituksella. Suunnittele oma uniikki lakkisi nyt!" />
      </Helmet>
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
                    <RealPictures  onClick={handleRealPictureModal}>{t("images")}</RealPictures>
                    
                    <CanvasToMiddle>
                        <Canvas  ref={canvasRef}>
                            <color attach="background" args={["#e6e6e6"]} />
                            <fog attach="fog" args={["#e6e6e6", 10, 20]} />
                            <ExperienceYlioppilaslakki/>
                        </Canvas>
                    </CanvasToMiddle>
                    <AnnouncementMobile>
                        <TextSlider className='move-text'>{setting.status ? setting.desc.toUpperCase() : t('3dText')}</TextSlider>
                    </AnnouncementMobile>


                    <FullscreenButton id="zoomContainer" onClick={toggleFullscreen} style={{ position: "absolute", bottom: 55, right: 10, zIndex: 1, fontSize: "30px" }}>
                        <ZoomInOutlined/>
                    </FullscreenButton>

                   
                
                </CanvasDiv>
              
                <OptionsDiv id="options-div">
                    <Configurator/>
                </OptionsDiv>
            </MainDiv>

       
            <Footer/>
            
            <RealPictureModal show={realPictureModalShow} onHide={() => setRrealPictureModalShow(false)} />
        </CapMainDiv>
    </CustomizationProvider>
  )
}

export default Ylioppilaslakki