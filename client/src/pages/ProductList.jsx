import React from 'react'; // Make sure you have this import
import { useEffect, useState } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { hotjar } from 'react-hotjar';
import {Helmet} from "react-helmet";

const Container = styled.div`
    
`

const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
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


const ProductList = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("")

    useEffect(() => {
        hotjar.initialize(Number(String(process.env.REACT_APP_HOTJAR_HJID)), Number(String(process.env.REACT_APP_HOTJAR_HJSV)))
    }, [])

    const handleFilters = (e) =>{
        const value = e.target.value;
        setFilters({
            ...filters, 
            [e.target.name]: value,
        });
    };


    return (
    <Container>
        <Helmet>
            <meta charSet="utf-8" />
            <title> TUOTTEET -  LAATULAKKI - YLIOPPILASLAKKI</title>
            <meta name="description" content="Tilaa perinteinen suomalainen ylioppilaslakki sinivalkoisella vuorilla ja paljon muita helposti Laatulakin verkkokaupasta. Toimitusaika 2-4 arkipäivää." />
        </Helmet>
        <Navbar/>
        <Announcement/>
        <Title>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>{t("filter_product")}:</FilterText>
                <Select name="colorFilter" defaultValue="none" onChange={handleFilters}>
                    <Option value="none"  disabled="disabled">
                    {t("color")}
                    </Option>
                    <Option value="valkoinen">{t('white')}</Option>
                    <Option value="musta">{t('black')}</Option>
                </Select>
                <Select name="sizeFilter" defaultValue="none" onChange={handleFilters}>
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
            </Filter>
            <Filter>
                <FilterText> {t("arrange_product")}:</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                    <Option value="newest">{t('newest')}</Option>
                    <Option value="cheapest">{t('cheapest_first')}</Option>
                    <Option value="most_expensive">{t('expensive_first')}</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter/>
        <Footer/>
    </Container>
  )
}
// cat={cat} filters={filters} sort={sort}

export default ProductList