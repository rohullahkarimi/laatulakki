import { ShoppingCartOutlined } from '@mui/icons-material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Badge } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"

// multi language
import '../i18n';
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Container = styled.div`
    height: 60px;
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
    font-size: 22px;
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
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
    font-size: 32px;
    ${mobile({fontSize: "18px"})}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({justifyContent: "center", flex: 2})}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px"})}
`;

const Navbar = () => {
  const { t } = useTranslation();
  const onChange = (event) => {
      i18n.changeLanguage(event.target.value);
  };
  const quantity = useSelector(state=>state.cart.quantity)
  //console.log(quantity)

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language name="language" onChange={onChange}>
                    <LanguageOption value="fi">{getUnicodeFlagIcon('FI')} FI</LanguageOption>
                    <LanguageOption value="en">{getUnicodeFlagIcon('US')} EN</LanguageOption>
                    <LanguageOption value="sv">{getUnicodeFlagIcon('SE')} SV</LanguageOption>
                </Language>
            </Left>
            <Center><Logo>LaatuLakki.fi</Logo></Center>
            <Right>
                <Link to="/login">
                    <MenuItem>Login</MenuItem>
                </Link>
                <MenuItem>{t('contact')}</MenuItem>
                <Link to="/cart">
                    <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined style={{marginLeft: "10px"}}/>
                    </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar