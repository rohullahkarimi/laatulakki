import React from 'react'; // Make sure you have this import
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
import { mobile } from "../responsive"
import {Helmet} from "react-helmet";
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
const List = styled.ol`
    list-style-type: disclosure-closed; 
`
const ListItem = styled.li`
    
`

const Desc = styled.p`
    margin: 20px 0px;
`
const Br = styled.br`
`
const Strong = styled.strong`
`


const Product = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Yleistä verkkokaupasta -  LAATULAKKI - YLIOPPILASLAKKI</title>
            <meta name="description" content="Verkkokaupan tuotteita myy Laatulakki Oy y-tunnus 3337953-9" />
        </Helmet>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t("termsAndCondition.1")}</Title>
                        
                        <H3>{t("termsAndCondition.2")}</H3>
                        <Desc>
                        {t("termsAndCondition.3")}
                        <Br/> <Br/>
                        <Strong>{t("termsAndCondition.4")}</Strong> <Br/>
                        {t("termsAndCondition.5")}
                        </Desc>
                        

                        
                        <H3>{t("termsAndCondition.6")}</H3>
                        <Desc>
                        {t("termsAndCondition.7")} <Br/> <Br/>
                        {t("termsAndCondition.8")}
                        </Desc>

                        

                        
                        <H3>{t("termsAndCondition.9")}</H3>
                        <Desc>{t("termsAndCondition.10")}</Desc>

                        

                        
                        <H3>{t("termsAndCondition.11")}</H3>
                        <Desc>
                        {t("termsAndCondition.12")}<Br/> <Br/>
                        {t("termsAndCondition.13")}</Desc>
                        

                        
                        <H3>{t("termsAndCondition.14")}</H3>
                        <Desc>
                        {t("termsAndCondition.15")}<Br/> <Br/>
                        {t("termsAndCondition.16")}<Br/> <Br/>
                        </Desc>
                      

                        
                        <H3>{t("termsAndCondition.17")}</H3>
                        <Desc>{t("termsAndCondition.18")}</Desc>
                        
                        

                        <H3>{t("termsAndCondition.19")}</H3>
                        <Desc>{t("termsAndCondition.20")}</Desc>

                        

                        
                        <H3>{t("termsAndCondition.21")}</H3>
                        <Desc>
                        {t("termsAndCondition.22")}
                        <Br/> <Br/>
                        {t("termsAndCondition.23")}<Br/> <Br/>
                        {t("termsAndCondition.24")}<Br/> <Br/>
                        {t("termsAndCondition.25")}</Desc>

                        

                        
                        <H3>{t("termsAndCondition.26")}</H3>
                        <Desc>
                        {t("termsAndCondition.27")}<Br/> <Br/>
                        {t("termsAndCondition.28")}</Desc>

                        

                        
                        <H3>{t("termsAndCondition.29")}</H3>
                        <Desc>
                        {t("termsAndCondition.30")}<Br/> <Br/>
                        {t("termsAndCondition.31")}<Br/> <Br/>
                        {t("termsAndCondition.32")}</Desc>

                        <H3>{t("termsAndCondition.33")}</H3>
                        <Desc>{t("termsAndCondition.34")}</Desc>


                        <H3>{t("termsAndCondition.35")}</H3>
                        <Desc>{t("termsAndCondition.36")}</Desc>
                        <Strong>{t("termsAndCondition.37")}</Strong>
                        <List>
                            <ListItem>{t("termsAndCondition.38")}</ListItem>
                            <ListItem>{t("termsAndCondition.39")}</ListItem>
                            <ListItem>{t("termsAndCondition.40")}</ListItem>
                            <ListItem>{t("termsAndCondition.41")}</ListItem>
                            <ListItem>{t("termsAndCondition.42")}</ListItem>
                            <ListItem>{t("termsAndCondition.43")}</ListItem>
                            <ListItem>{t("termsAndCondition.44")}</ListItem>
                            <ListItem>{t("termsAndCondition.45")}</ListItem>
                            <ListItem>{t("termsAndCondition.46")}</ListItem>
                            <ListItem>{t("termsAndCondition.47")}</ListItem>
                            <ListItem>{t("termsAndCondition.48")}</ListItem>
                            <ListItem>{t("termsAndCondition.49")}</ListItem>
                            <ListItem>{t("termsAndCondition.50")}</ListItem>
                            <ListItem>{t("termsAndCondition.51")}</ListItem>
                            <ListItem>{t("termsAndCondition.52")}</ListItem>
                            <ListItem>{t("termsAndCondition.53")}</ListItem>
                        </List>
                        

                        <H3>{t("termsAndCondition.54")}</H3>
                        <Desc>{t("termsAndCondition.55")}</Desc>
                        <Desc>
                        Paytrail Oyj, y-tunnus: 2122839-7<Br/>
                        Innova 2<Br/>
                        Lutakonaukio 7<Br/>
                        40100 Jyväskylä<Br/>
                        Puhelin: 0207 181830<Br/>
                        www.paytrail.com<Br/>
                        </Desc>

                        <H3>{t("termsAndCondition.56")}</H3>
                        <Desc>
                        {t("termsAndCondition.57")}<Br/><Br/>
                        {t("termsAndCondition.58")}</Desc>

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Product