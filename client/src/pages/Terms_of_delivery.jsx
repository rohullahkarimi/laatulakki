import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
//import { useTranslation } from "react-i18next";
import { mobile } from "../responsive"
import {
    Container, Row, Col
  } from 'react-bootstrap';


  
const ContainerDiv = styled.div`
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})}
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 4%;
`
const H3 = styled.h3`
    
`


const Desc = styled.p`
    margin: 20px 0px;
`

const Strong = styled.strong`
`


const TermsOfDelivery = () => {
  //const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>TOIMITUSEHDOT</Title>
                        <H3>Toimitustavat- ja kulut</H3>
                        <Desc>Käsittelemme tilaukset usein jo saman päivän aikana, kuitenkin viimeistään seuraavana arkipäivänä tilauksesta. Postitamme tuotteita jokaisena arkipäivänä. Toimitukset kotimaassa ovat noudettavissa 2-4 arkipäivän kuluessa tilauksesta.</Desc>

                        <H3>Kotimaan toimitukset</H3>

                        <Strong>Matkahuollon Lähellä paketti 6,90€</Strong>
                        <Desc>Lähellä-paketti on noudettavissa yli 1400 Matkahuollon palvelupisteestä, Matkahuoltojen lisäksi myös mm. K-Marketeista, R-kioskeista ja Pakettiautomaateista sekä -roboteista. Saat tekstiviestin tai sähköpostin heti, kun paketti on noudettavissa. Lähetys on noudettavissa 7 vuorokauden ajan saapumisilmoituksesta. Toimitusaika n. 1-3 työpäivää.</Desc>

                        <Strong>Postin Postipaketti 6,90€</Strong>
                        <Desc>Hae paketti automaatista tai palvelupisteestä. Saat viestin, kun voit hakea paketin. Voit seurata lähetyksen matkaa OmaPosti-sovelluksella. Toimitus hiilineutraalina Posti Green-lähetyksenä. Lähetys on noudettavissa 7 vuorokauden ajan saapumisilmoituksesta. Toimitusaika n. 1-3 työpäivää.</Desc>

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default TermsOfDelivery