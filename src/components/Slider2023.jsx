
import styled from "styled-components";
import "../common/css/slider2023.css"
import { Helmet } from "react-helmet";
import {  tablet } from "../responsive";
import { Link } from "react-router-dom";

const BannerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1.75rem;
  ${tablet({alignItems: "center"})}
`


const HeadingXl = styled.h1`
    font-family: inherit;
    font-size: clamp(2.648rem, 6vw, 4.241rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -1px;
  ${tablet({textAlign: "center"})}
`


const Slider2023 = () => {



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
                    <img className="banner-image" src="/images/malli/malli_0.jpeg" alt="banner"/>
                    <BannerInner>
                        <HeadingXl>Kustomoidut ylioppilaslakit</HeadingXl>
                        <p className="paragraph">
                        Suomen edullisin kustomoidut ylioppilaslakki
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
