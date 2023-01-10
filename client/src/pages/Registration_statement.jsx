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
                        <Title>{t("registeration.1")}</Title>
                        
                        <H3>{t("registeration.2")}</H3>
                        <Desc>
                        RohisTech tmi<Br/>
                        Jussilankatu 1 B 11,<Br/>
                        05880 Hyvinkää<Br/>
                        <Br/>
                        {t("registeration.3")}: 3189040-5<Br/>
                        {t("registeration.4")}: 040 026 9034<Br/>
                        rohistech@gmail.com<Br/>
                        </Desc>
                        

                        
                        <H3>{t("registeration.5")}</H3>
                        <Desc>
                        Rohullah Karimi<Br/>
                        rohistech@gmail.com<Br/>
                        <Br/>
                        RohisTech tmi<Br/>
                        Jussilankatu 1 B 11,<Br/>
                        05880 Hyvinkää
                        </Desc>

                        

                        
                        <H3>{t("registeration.6")}</H3>
                        <Desc>{t("registeration.7")}</Desc>

                        

                        
                        <H3>{t("registeration.8")}</H3>
                        <Desc>
                        {t("registeration.9")}
                        <Br/>
                        {t("registeration.10")}
                        </Desc>
                        

                        
                        <H3> {t("registeration.11")}</H3>
                        <Desc> {t("registeration.12")}</Desc>
                        <List>
                            <ListItem> {t("registeration.13")}</ListItem>
                            <ListItem> {t("registeration.14")}</ListItem>
                            <ListItem> {t("registeration.15")}</ListItem>
                        </List>
                        

                        
                        <H3>{t("registeration.16")}</H3>
                        <Desc>{t("registeration.17")}</Desc>
                        
                        

                        <H3>{t("registeration.18")}</H3>
                        <Desc>{t("registeration.19")}</Desc>

                        

                        
                        <H3>{t("registeration.20")}</H3>
                        <Desc>{t("registeration.21")}</Desc>

                        

                        
                        <H3>{t("registeration.22")}</H3>
                        <Desc>{t("registeration.23")}</Desc>

                        

                        
                        <H3>{t("registeration.24")}</H3>
                        <Desc>
                        {t("registeration.25")}
                        <Br/><Br/>
                        {t("registeration.26")}
                        <Br/><Br/>
                        {t("registeration.27")}
                        <Br/><Br/>
                        {t("registeration.28")}
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