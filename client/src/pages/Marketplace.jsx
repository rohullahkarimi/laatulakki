import React from 'react'; // Make sure you have this import
import { useEffect, useState } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { hotjar } from 'react-hotjar';
import {Helmet} from "react-helmet";
import CallToActionButton from '../components/callToAction';

const Container = styled.div`
    
`

const Title = styled.h1`
    margin: 15px;
    text-align: center;
    font-size: 24px;
`
const Subtitle = styled.p`
    font-size: 16px;
    text-align: center;
    margin-bottom: 2rem;
`

const FilterContainer = styled.div`
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;
    ${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: "0px"})}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`

const Option = styled.option``

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Button = styled.button`
padding: 8px 30px;
background-color: white;
color: black;
cursor: pointer;
font-weight: 600;
border: 2px solid white;
border-radius: 0px;
transition: background-color 0.3s ease 0s, color 0.3s ease 0s;
background-color: ${(props) => (props.selected ? 'black' : '#e7e7e7')};
color: ${(props) => (props.selected ? '#e7e7e7' : 'black')};
border: none;
`;

const ProductList = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({})
    const navigate = useNavigate()
    const [selectedButton, setSelectedButton] = useState('buy');

    useEffect(() => {
        hotjar.initialize(Number(String(process.env.REACT_APP_HOTJAR_HJID)), Number(String(process.env.REACT_APP_HOTJAR_HJSV)))
    }, [])

    const handleFilters = (e) =>{
        const { name, value } = e.target;
        setFilters({
            ...filters, 
            [name]: value,
        });
    };

    console.log(filters)
    
    const handleBuyClick = () => {
        setSelectedButton('buy');
    };

    const handleSellClick = () => {
        setSelectedButton('sell');
        navigate('/marketplace/sell'); // Redirect to the sell page
    };

    return (
    <Container>
        <Helmet>
            <meta charSet="utf-8" />
            <title> TUOTTEET -  LAATULAKKI - YLIOPPILASLAKKI</title>
            <meta name="description" content="Tilaa perinteinen suomalainen ylioppilaslakki sinivalkoisella vuorilla ja paljon muita helposti Laatulakin verkkokaupasta. Toimitusaika 2-4 arkipäivää." />
        </Helmet>
        <Announcement/>
        <Navbar/>
        <Title>{t('usedGraduationCap')}</Title>
        <ButtonContainer>
            <Button selected={selectedButton === 'buy'} onClick={handleBuyClick}>{t('buy')}</Button>
            <Button selected={selectedButton === 'sell'} onClick={handleSellClick}>{t('sell')}</Button>
        </ButtonContainer>
        <Subtitle>{t('marketplaceText')}</Subtitle>
        <FilterContainer>
            <Filter>
                <FilterText>{t("filter_product")}:</FilterText>
                <Select name="size" defaultValue="none" onChange={handleFilters}>
                    <Option value="none" disabled="disabled">
                        {t("size")}
                    </Option>
                    <Option value="52">52 cm</Option>
                    <Option value="53">53 cm</Option>
                    <Option value="54">54 cm</Option>
                    <Option value="55">55 cm</Option>
                    <Option value="58">56 cm</Option>
                    <Option value="57">57 cm</Option>
                    <Option value="58">58 cm</Option>
                    <Option value="59">59 cm</Option>
                    <Option value="60">60 cm</Option>
                    <Option value="61">61 cm</Option>
                    <Option value="62">62 cm</Option>
                    <Option value="63">63 cm</Option>
                    <Option value="64">64 cm</Option>
                    <Option value="65">65 cm</Option>
                </Select>

                <Select name="brand" defaultValue="none" onChange={handleFilters}>
                    <Option value="none" disabled="disabled">
                        {t('brandName')}
                    </Option>
                    <Option value="fredrikson">Fredrikson</Option>
                    <Option value="salon">Salon lakkitehdas</Option>
                    <Option value="seifert">Seifert</Option>
                    <Option value="wahlman">Wahlman</Option>
                    <Option value="laatulakki">Laatulakki</Option>
                </Select>
                
                {/*
                <Select name="sort" onChange={handleFilters}>
                    <Option value="newest">{t('newest')}</Option>
                    <Option value="cheapest">{t('cheapest_first')}</Option>
                    <Option value="most_expensive">{t('expensive_first')}</Option>
                </Select>
                */}

            </Filter>
         
        </FilterContainer>
        <Products used={true} filters={filters} />
        <CallToActionButton/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList