import React from "react";
//import React from 'react'
import styled from 'styled-components'
import { mobile, smartPhone, tablet, laptop, largeLaptop } from "../responsive"
//import {  useHistory } from "react-router-dom"
import logo from "../images/laatulakki_long_logo_2024.png"
import {ShoppingCartIcon } from "@heroicons/react/24/outline";

// theme
//import { brandColor } from '../theme';


const Container = styled.div`
    height: 60px;
    padding: 0 15%;
    border-bottom: 1px solid #e9e8e8;
    ${largeLaptop({padding: "0px 10%"})}
    ${laptop({padding: "0px 5%"})}
    ${tablet({padding: "0px"})}
    ${smartPhone({flexDirection: "column", padding: "0px"})}
    ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${laptop({padding: "13px 10px"})}
    ${smartPhone({padding: "18px 10px"})}
    ${mobile({padding: "13px 0px"})}
`

const Left = styled.div`
    flex: 1;
    display: flix;
    align-items: center;
    ${mobile({paddingLeft:"15px"})}

`;

/*
const Language = styled.select`
    font-size: 18px;
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-bottom: 2px solid #${brandColor};
    ${mobile({fontSize: "18px", marginLeft: "10px"})}
`
*/



const Center = styled.div`
    /*
    flex: 1;
    text-align: center;
    */
`;

const Logo = styled.img`
    width: 140px;
    height: "auto";
    cursor: pointer;
    ${smartPhone({width:"120px"})}
    ${mobile({width:"115px"})}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({marginRight: "15px"})}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px"})}
`;

const LangDiv = styled.div`
    display: flex;
    border-bottom: 2px solid rgb(52, 231, 228);
    font-size: 16px;
    cursor: pointer;
    ${mobile({fontSize: "12px"})}
`;



const Navbar = () => {
  //const navigate = useHistory();

  const goToHomePage = () => {
    window.location.replace('/');
  };

  const goToShopPage = () => {
    window.location.replace('https://www.laatulakki.fi');
  };


  


  return (
    <Container>
        <Wrapper>
            <Left>
                <LangDiv onClick={goToShopPage}>
                  Verkkokauppa
                </LangDiv>
            </Left>
            <Center><Logo onClick={goToHomePage} src={logo}/></Center>
            <Right>
                <MenuItem>
                    <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                    />
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar