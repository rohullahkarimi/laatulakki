import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
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
        <Navbar/>
            <Container style={{padding: "2% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t("changeAndRefund.header")}</Title>
                        
                        <H3>{t("changeAndRefund.1")}</H3>
                        <Desc>
                        {t("changeAndRefund.2")}
                        </Desc>
                     

                        <H3>{t("changeAndRefund.3")}</H3>
                        <Desc>{t("changeAndRefund.4")}</Desc>
                        <Strong>{t("changeAndRefund.5")}</Strong>
                        <List>
                            <ListItem>{t("changeAndRefund.6")}</ListItem>
                            <ListItem>{t("changeAndRefund.7")}</ListItem>
                            <ListItem>{t("changeAndRefund.8")}</ListItem>
                            <ListItem>{t("changeAndRefund.9")}</ListItem>
                            <ListItem>{t("changeAndRefund.10")}</ListItem>
                            <ListItem>{t("changeAndRefund.11")}</ListItem>
                        </List>
                        
                        <Desc>
                        {t("changeAndRefund.12")}
                        <Br/><Br/>
                        {t("changeAndRefund.13")}
                        </Desc>
                    

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Product