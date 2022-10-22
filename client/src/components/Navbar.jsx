import { ShoppingCartOutlined } from '@mui/icons-material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Badge } from '@mui/material';
//import React from 'react'
import styled from 'styled-components'
import { mobile, smartPhone, tablet, laptop, largeLaptop } from "../responsive"
import {useSelector} from "react-redux"
import {  useNavigate } from "react-router-dom"
import CartModal from "../components/CartModal"


// multi language
import '../i18n';
import i18n from "i18next";
//import { useTranslation } from "react-i18next";

// theme
import { brandColor } from '../theme';
import { useState } from 'react';

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
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0px"})}
`

const Left = styled.div`
    flex: 1;
    display: flix;
    align-items: center;
`;

const Language = styled.select`
    font-size: 18px;
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-bottom: 2px solid #${brandColor};
    ${mobile({fontSize: "18px", marginLeft: "10px"})}
`

const LanguageOption = styled.option`
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    font-size: 32px;
    ${mobile({fontSize: "18px", paddingTop: "8px"})}
    ${smartPhone({fontSize: "20px", paddingTop: "8px"})}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({justifyContent: "center"})}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px"})}
`;

const LangDiv = styled.div`
    display: flex;
`;



const Navbar = () => {
  //const { t } = useTranslation();
  //const user = useSelector((state)=> state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const onChange = (event) => {
      i18n.changeLanguage(event.target.value);
  };
  const quantity = useSelector(state=>state.cart.quantity)
  const navigate = useNavigate();
  const selectedLang = i18n.language
  const [modalShow, setModalShow] = useState(false);
  //console.log(selectedLang)
  //console.log(quantity)

  /*
  const navigateLogin = () => {
    navigate('/login');
  };
  const navigateLoginOut = () => {
    navigate('/login');
  };
  */
  const goToHomePage = () => {
    navigate('/');
  };

  const handleEmptyCart = (() => {
    if(cart.quantity === 0){
        setModalShow(true)
    }else{
        navigate("/cart")
    }
  });
  

  const languages = [
        { lang: "fi", country: "fi" },
        { lang: "se", country: "se" },
        { lang: "en", country: "gb" },
    ]

    /*
    {user ? (
        <MenuItem onClick={navigateLogin}>{t('logOut')}</MenuItem>
    ) : (
        <MenuItem onClick={navigateLoginOut}>{t('login')}</MenuItem>
    )}
    */
  return (
    <Container>
        <Wrapper>
            <Left>
                <LangDiv>
                    <Language name="language" onChange={onChange} defaultValue={selectedLang}>
                        {languages.map(({lang, country})=>{
                            const countryName = country.toUpperCase()
                            const langName = lang.toUpperCase()
                            
                            
                            return (
                                <LanguageOption key={lang} value={lang}>{getUnicodeFlagIcon(countryName)} {langName} </LanguageOption>
                            )
                        })}
                    </Language>
                </LangDiv>
            </Left>
            <Center><Logo onClick={goToHomePage}>LaatuLakki.fi</Logo></Center>
            <Right>
                <MenuItem onClick={handleEmptyCart}>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined style={{marginLeft: "10px"}}/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
        <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  )
}

export default Navbar