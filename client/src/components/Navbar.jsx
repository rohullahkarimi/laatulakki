import React from 'react'; // Make sure you have this import
import { MenuOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Badge } from '@mui/material';
//import React from 'react'
import styled from 'styled-components'
import { mobile, smartPhone, tablet, laptop, largeLaptop } from "../responsive"
import {useSelector} from "react-redux"
import {  useNavigate } from "react-router-dom"
import CartModal from "../components/CartModal"
import logo from "../images/laatulakki_long_logo.jpg"
import Dropdown from './Dropdown';


// multi language
import '../i18n';
import i18n from "i18next";
//import { useTranslation } from "react-i18next";

// theme
import { brandColor } from '../theme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    margin-left: 0;
`;

const Language = styled.select`
    font-size: 18px;
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-bottom: 2px solid #${brandColor};
    ${mobile({fontSize: "14px", marginLeft: "10px"})}


`
const LogoHiderL = styled.div`
  display: block;
  ${tablet({display: "none"})}
`;

const LogoHiderC = styled.div`
  display: none;
  ${tablet({display: "block"})}
`;




const LanguageOption = styled.option`
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.img`
    width: 140px;
    height: "auto";
    cursor: pointer;
    margin: auto;
    ${smartPhone({width:"120px"})}
    ${mobile({width:"93px"})}
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
    margin-left: 10px;
    ${mobile({fontSize: "12px", marginLeft: "0px"})}
`;

const LangDiv = styled.div`
    display: flex;
`;


const Hamburger = styled.div`
  font-size: 16px;
  cursor: pointer;
  display: none; /* Initially hide the hamburger menu on larger screens */
  ${tablet({ display: "block" })} /* Show it on mobile */
  ${mobile({ marginLeft: "15px" })} /* Show it on mobile */
`;




const Navbar = () => {
  const { t } = useTranslation();
  //const user = useSelector((state)=> state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const onChange = (event) => {
      i18n.changeLanguage(event.target.value);
  };
  const quantity = useSelector(state=>state.cart.quantity)
  const navigate = useNavigate();
  const selectedLang = i18n.language
  const [modalShow, setModalShow] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const items = [
    { text: t('sliderTitle1'), url: '/ylioppilaslakki' },
    { text: t('lyyratText'), url: '/products/lyyra' },
    { text: t('topups'), url: '/products/topup' },
    { text: t('footer0'), url: '/our_story' },
    { text: t('blog'), url: 'https://blog.laatulakki.fi/' },
  ];

  const goToHomePage = () => {
    navigate('/');
  };
  

  const handleEmptyCart = (() => {
    if(cart.quantity === 0){
        setModalShow(true)
    }else{
        window.location.pathname === "/cart" ? alert(t("alreadyInCart")) : navigate("/cart")    
    }
  });
  

  const languages = [
        { lang: "fi", country: "fi" },
        { lang: "se", country: "se" },
        { lang: "en", country: "gb" },
    ]

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

  return (
    <Container>
        <Wrapper>
            <Left>
          
                <LogoHiderL>
                    <Logo onClick={goToHomePage} src={logo}/>
                </LogoHiderL>
         
                {/* Add a hamburger menu */}
                <Hamburger onClick={toggleDropdown}>
                    <MenuOutlined/>
                </Hamburger>
                <Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} items={items} logoSrc={logo} categoryImageUrl={"/public/images/categories/customized_500x334.jpg"} />
            </Left>
            <Center>
                <LogoHiderC>
                    <Logo onClick={goToHomePage} src={logo}/>
                </LogoHiderC>
            </Center>
            <Right>
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