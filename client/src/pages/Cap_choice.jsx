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
/*
const H3 = styled.h3`
    
`
*/


const Desc = styled.p`
    margin: 20px 0px;
`


const List = styled.ol`
    list-style-type: disclosure-closed; 
`
const ListItem = styled.li`
    
`

const CapChoice = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Oikean ylioppilaslakin valinta</title>
            <meta name="description" content="Oikean yo-lakin valinta - LaatuLakki - Ylioppilaslakki" />
        </Helmet>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t("capChoice0")}</Title>
                        
                        <h4>{t("capChoice1a")}</h4>
                        <div>
                        <iframe width="320" height="560" src="https://youtube.com/embed/fH-xn70AkIw" title="Pakataan ylioppilaslakki yhdessä 🌹" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>

                        <Desc>{t("capChoice1")}</Desc>

                        <List>
                            <ListItem>{t("capChoice2")}</ListItem>
                            <ListItem>{t("capChoice3")}</ListItem>
                            <ListItem>{t("capChoice4")}</ListItem>
                            <ListItem>{t("capChoice4a")}</ListItem>
                            <ListItem>{t("capChoice5")}</ListItem>
                        </List>

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default CapChoice