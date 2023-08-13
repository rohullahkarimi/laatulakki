
import React from 'react'; // Make sure you have this import
import styled from "styled-components";
import "../common/css/slider2023.css"
import { Helmet } from "react-helmet";
import {  smartPhone, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

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
    font-size: clamp(2.648rem, 6vw, 4.241rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -1px;
  ${tablet({textAlign: "center"})}
`

const BannerImage = styled.img`
  display: block;
  max-width: 18rem;
  height: auto;
  margin-top: 2rem;
  object-fit: cover;
  justify-self: center;
    

  @media only screen and (min-width: 64rem) {
    max-width: 25rem;
    height: auto;
    margin-right: 5rem;
  }

  @media only screen and (min-width: 42rem) {
    order: 2;
    max-width: 20rem;
    height: auto;
    object-position: "100% 0";
  }
  

 
`;

const Slider2023 = () => {
  const { t } = useTranslation();



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
                    <BannerImage className='bannerImageMobile' src="/public/images/malli/malli_0.jpeg" alt="banner"/>
                    <BannerInner>
                        <HeadingXl>{t('sliderTitle1')}</HeadingXl>
                        <p className="paragraph">
                            {t('sliderDesciption')}
                        </p>
                        <Link to="/ylioppilaslakki">
                            <button className="btn-el btn-darken btn-inline">
                            SUUNNITTELE OMASI<i className="bx bx-right-arrow-alt"></i>
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
