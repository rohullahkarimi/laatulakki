
import React, { useEffect, useState } from 'react'; // Make sure you have this import
import styled from "styled-components";
import "../common/css/slider2023.css"
import { Helmet } from "react-helmet";
import {  smartPhone, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { publicRequest } from '../requestMethods';
import i18n from '../i18n';

const BannerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1.75rem;
  ${tablet({alignItems: "center"})}
  ${smartPhone({paddingBottom: "6%"})}
`


const HeadingXl = styled.h1`
    font-family: inherit;
    font-size: clamp(1.648rem, 3vw, 2.241rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -1px;
    color: white;
  ${tablet({textAlign: "center"})}
`

const BannerImage = styled.img`
  display: block;
  height: auto;
  /*margin-top: 2rem;*/
  object-fit: cover;
  justify-self: center;
    


  @media only screen and (min-width: 42rem) {
    order: 2;
    max-width: 100%;
    height: auto;
    object-position: "100% 0";
  }

  @media only screen and (min-width: 64rem) {
    max-width: 35rem;
    height: auto;
    margin-right: 5rem;
  }

  

 
`;

const Avainlippu = styled.img`
  width: 80px; 
  display: none; 
  ${smartPhone({display: "block", position: "absolute", top: "10px", left: "21px"})}
`;


const Slider2023 = () => {
  const { t } = useTranslation();
  const selectedLang = i18n.language
  const [setting, setSetting] = useState({
    "status": false,
    "title": "",
    "desc": "",
  })

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

  

  return (
    <>
        <Helmet>
        <link
            rel="stylesheet"
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        </Helmet>
        <main className="main">
            <section className="section banner banner-section">
                <div className="container banner-column">
                    
                    <Avainlippu src="/public/images/common/avainlippu_1_x100.png"/>
                    <BannerImage className='bannerImageMobile' src="/public/images/graduation_cap/v23/800/ylioppilaslakki_15.jpg" alt="banner"/>
                    
                    <BannerInner>
                        <Link to="/ylioppilaslakki">
                          <HeadingXl>{setting.status ? setting.title.toUpperCase() : t('sliderTitle1')}</HeadingXl>
                        </Link>
                          <p className="paragraph">
                            {setting.status ? setting.desc.toUpperCase() : t('sliderDesciption')}
                          </p>
                        <Link to="/ylioppilaslakki">
                           <button className="btn-el btn-darken btn-inline">
                           {t('designYours')}<i className="bx bx-right-arrow-alt"></i>
                            </button>
                        </Link>
                    </BannerInner>
                    <div className="banner-links">
                        <a href="https://www.facebook.com/profile.php?id=100090012454476" title=""><i className="bx bxl-facebook"></i></a>
                        <a href="https://www.instagram.com/laatulakki/" title=""><i className="bx bxl-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCfcLwu9-NMAARiiDQiacWcw" title=""><i className="bx bxl-youtube"></i></a>
                    </div>
                </div>
            </section>
        </main>
    </>
    
  );
};

export default Slider2023;
