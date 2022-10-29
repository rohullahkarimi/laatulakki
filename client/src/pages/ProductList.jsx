import { useEffect, useState } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive"
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next"
import { hotjar } from 'react-hotjar';

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

    console.log(filters)


    return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>{t("filter_product")}:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option valuee="color" disabled>
                    {t("color")}
                    </Option>
                    <Option value="valkoinen">Valkoinen</Option>
                    <Option value="musta">Musta</Option>
                </Select>
                <Select name="size" onChange={handleFilters}>
                    <Option valuee="size" disabled>
                    {t("size")}
                    </Option>
                    <Option value="57">57</Option>
                    <Option value="58">58</Option>
                    <Option value="59">59</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText> {t("arrange_product")}:</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                    <Option value="newest">Uutuudet</Option>
                    <Option value="cheapest">Hinta: halvin ensin</Option>
                    <Option value="most_expensive">Hinta: kallein ensin</Option>
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