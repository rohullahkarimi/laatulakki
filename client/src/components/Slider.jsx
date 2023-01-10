import { ArrowLeftOutlined } from '@mui/icons-material'
import { ArrowRightOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
//import { sliderItems } from '../data'
import { mobile, smartPhone, tablet } from '../responsive'
import { useTranslation } from "react-i18next";
import '../fonts/OmnesBold.ttf';


const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    /*background-color: coral;*/
    position: relative;
    overflow: hidden;
    ${tablet({display: "none"})}
    ${smartPhone({display: "none"})}
    ${mobile({display: "none"})}
`

const Arrow = styled.div`
    height: 50px;
    width: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 2.5;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: #${props=>props.bg};
`
const ImgContainer = styled.div`
    height: 100%;
    flex: 1.5;
`

const Image = styled.img`
    height: 100%;
    flex: 1;
    width: 100%;
    object-fit: cover;
`

const InfoContainer = styled.div`
    padding: 50px;
    flex: 0.5;
`

const Title = styled.h1`
    font-feature-settings: "kern", "ss01", "ss05", "ss07";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
    font-family: 'Omnes Bold', sans-serif;
    font-variant-ligatures: common-ligatures;
    font-size: 3.75rem;
    line-height: 4.75rem;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    text-transform: none;
    margin: 0px 0px 2.75rem;
`
const Description = styled.p`
    font-family: 'Omnes Bold', sans-serif;
    margin: 50px 0px;
    font-style: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const { t } = useTranslation();
    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate()
    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                <Slide key="1" bg="f5fafd">
                    <ImgContainer>
                        <Image src="https://images.squarespace-cdn.com/content/v1/5ded2afaf87cb8636cacc659/0954be2b-4467-4253-89a1-348b06f750aa/_11B9027.jpg"/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{t("hope")}</Title>
                        <Description>{t("hope_desc")}</Description>
                        <Button onClick={()=>navigate("/products/lakki")}>{t("buy_now")}</Button>
                    </InfoContainer>
                </Slide>

                <Slide key="2" bg="fcf1ed">
                    <ImgContainer>
                        <Image src="https://www.vastavalo.net/albums/userpics/10728/normal_yo-3767.jpg"/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{t("oiva")}</Title>
                        <Description>{t("oiva_desc")}</Description>
                        <Button onClick={()=>navigate("/products/lakki")}>{t("buy_now")}</Button>
                    </InfoContainer>
                </Slide>

                <Slide key="3" bg="fbf0f4">
                    <ImgContainer>
                        <Image src="https://www.kemi.fi/wp-content/uploads/2022/05/Ylioppilaslakki-rotated-e1653637283799.jpg"/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{t("vegani")}</Title>
                        <Description>{t("vegani_desc")}</Description>
                        <Button onClick={()=>navigate("/products/lakki")}>{t("buy_now")}</Button>
                    </InfoContainer>
                </Slide>
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider