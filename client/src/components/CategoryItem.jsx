import React from 'react'; // Make sure you have this import
import styled from 'styled-components'
import { laptop, mobile, smartPhone, tablet } from '../responsive'
import {
    Link
  } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 400px; 
    position: relative;
`


const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    /*${mobile({height: "20vh"})}*/
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`


const Title = styled.h1`
    color: #009291;
    margin-bottom: 35%;
    font-size: 22px;
    backdrop-filter: blur(6px);
    ${laptop({marginBottom: "65%"})}
    ${tablet({marginBottom: "50%"})}
    ${smartPhone({marginBottom: "45%"})}
    ${mobile({marginBottom: "40%"})}
`


const Button = styled.button`
    border: none;
    padding: 10px 20px;
    background-color: ${(props) => (props.buttonColor === 'black' ? 'black' : 'white')};
    color: ${(props) => (props.buttonColor === 'black' ? 'white' : 'black')};
    cursor: pointer;
    font-weight: 600;
    border: 2px solid ${(props) => (props.buttonColor === 'black' ? 'black' : 'white')};
    border-radius: 0px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.buttonColor === 'black' ? 'white' : 'black')};
        color: ${(props) => (props.buttonColor === 'black' ? 'black' : 'white')};
    }
    ${smartPhone({padding: "5px 10px"})}
`;

const CategoryItem = () => {
  const { t } = useTranslation();


  // className="hide_in_mobile"
  return (
    <>
    <Container>
        <Link to={`/ylioppilaslakki`}>
            <Image src="/public/images/categories/customized.jpg"/>
            <Info>
                <Title>{t("sliderTitle1").toUpperCase()}</Title>
                <Button buttonColor="white">{t("buy_now").toUpperCase()}</Button>
            </Info>
        </Link>
    </Container>

    
    <Container>
            <Link to={`/products/ylioppilaslakki`}>
                <Image src="/public/images/categories/classic.jpg"/>
                <Info>
                    <Title>{t("highSchoolCap").toUpperCase()}</Title>
                    <Button>{t("buy_now").toUpperCase()}</Button>
                </Info>
            </Link>
    </Container>

    <Container>
            <Link to={`/products/lyyra`}>
                <Image src="/public/images/categories/badges.jpg"/>
                <Info>
                    <Title>{t("lyyratText").toUpperCase()}</Title>
                    <Button  buttonColor="white">{t("buy_now").toUpperCase()}</Button>
                </Info>
            </Link>
    </Container>

  
    </>
  )
}

export default CategoryItem