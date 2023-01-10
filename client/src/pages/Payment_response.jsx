import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
//import { useTranslation } from "react-i18next";
//import { mobile } from "../responsive"

import {
    Container
  } from 'react-bootstrap';
import Success from "../components/cart/Success";
import Cancel from "../components/cart/Cancel";
import { useSearchParams } from "react-router-dom";


  
const ContainerDiv = styled.div`
`

const Product = () => {
    const [searchParams] = useSearchParams();
    const checkoutStatus = searchParams.get("checkout-status")

    //const { t } = useTranslation();
    //const location = useLocation();
  
    
    return (
    <ContainerDiv>
        <Navbar/>
            <Container style={{padding: "2% 0"}}>
                {checkoutStatus === "ok" ? <Success/> : <Cancel/>}
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Product