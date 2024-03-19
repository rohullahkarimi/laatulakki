import React from 'react'; // Make sure you have this import
import { MenuOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Badge } from '@mui/material';
//import React from 'react'

import {useSelector} from "react-redux"
import {  useNavigate } from "react-router-dom"
import CartModal from "../components/CartModal"
import logo from "../images/laatulakki_long_logo_2024.png"
import Dropdown from './Dropdown';
import * as Styled from './styledComponent/navbarStyledComponents';

// multi language
import '../i18n';
import i18n from "i18next";
//import { useTranslation } from "react-i18next";

// theme
import { brandColor } from '../theme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';



// ItemList component
const ItemList = ({ items, navigate }) => {
    const { t } = useTranslation();
    const ItemListContainer = styled.div`
        display: flex;
        justify-content: center;
    `;

    const Item = styled.div`
        font-size: 16px;
        cursor: pointer;
        margin: 10px 15px;
        font-weight: 400;
        position: relative;
        &:not(:last-child) {
            margin-right: 7px; /* Add a gap between the menus */
        }
        &.active::after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #${brandColor}; /* Add a green line under the active menu */
        }
        @media screen and (min-width: 800px) and (max-width: 1000px) {
            margin: 5px 5px; 
            font-size: 13px;
        }
    `;

    return (
        <ItemListContainer>
            <Item
                className={window.location.pathname === "/" ? "active" : ""}
                onClick={() => navigate("/")}
            >
                {t('homepage')}
            </Item>
            {items.map((item, index) => (
                <Item
                    key={index}
                    className={
                        window.location.pathname === item.url ? "active" : ""
                    }
                    onClick={() =>
                        item.url.startsWith("http")
                            ? window.open(item.url, "_blank")
                            : navigate(item.url)
                    }
                >
                    {item.text}
                </Item>
            ))}
        </ItemListContainer>
    );
};

  

  

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
    { text: t('highSchoolCap').charAt(0).toUpperCase() + t('highSchoolCap').slice(1).toLowerCase(), url: '/products/ylioppilaslakki' },
    { text: t('usedGraduationCap'), url: '/marketplace' },
    { text: t('packages'), url:  '/products/paketit' },
    { text: t('lyyratText'), url: '/products/lyyra' },
    { text: t('topups'), url: '/products/topup' },
    { text: t('footer0'), url: '/our_story' }
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
    <>
    <Styled.Container>
        <Styled.Wrapper>
            <Styled.Left>
          
                <Styled.LogoHiderL>
                    <Styled.Logo onClick={goToHomePage} src={logo}/>
                </Styled.LogoHiderL>
         
                {/* Add a hamburger menu */}
                <Styled.Hamburger onClick={toggleDropdown}>
                    <MenuOutlined/>
                </Styled.Hamburger>
                <Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} items={items} logoSrc={logo} categoryImageUrl={"/public/images/categories/customized_500x334.jpg"} />
            </Styled.Left>
            <Styled.Center>
                <Styled.LogoHiderL>
                    <Styled.AvainlippuContainer onClick={goToHomePage}>
                        <Styled.Avainlippu src="/public/images/common/avainlippu_1_x100.png"/>
                        <Styled.FinnishService>{t('finnishService')}</Styled.FinnishService>
                    </Styled.AvainlippuContainer>
                </Styled.LogoHiderL>
                <Styled.LogoHiderC>
                    <Styled.Logo onClick={goToHomePage} src={logo}/>
                </Styled.LogoHiderC>
            </Styled.Center>
            <Styled.Right>
                <Styled.LangDiv>
                    <Styled.Language name="language" onChange={onChange} defaultValue={selectedLang}>
                        {languages.map(({lang, country})=>{
                            const countryName = country.toUpperCase()
                            const langName = lang.toUpperCase()
                            
                            
                            return (
                                <Styled.LanguageOption key={lang} value={lang}>{getUnicodeFlagIcon(countryName)} {langName} </Styled.LanguageOption>
                            )
                        })}
                    </Styled.Language>
                </Styled.LangDiv>
                <Styled.MenuItem onClick={handleEmptyCart}>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined style={{marginLeft: "10px"}}/>
                    </Badge>
                </Styled.MenuItem>
            </Styled.Right>
        </Styled.Wrapper>
        <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </Styled.Container>
  
    <Styled.ItemsListContainerDesktop>
        <ItemList items={items} navigate={navigate} />
    </Styled.ItemsListContainerDesktop>

    </>
    
  )
}

export default Navbar