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


const Desc = styled.p`
    margin: 20px 0px;
`


const CapUsage = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>YLIOPPILASLAKIN KÄYTTÖ- JA HOITO-OHJEET</title>
            <meta name="description" content="Kulumat ja kellastuminen ovat normaaleja yo-lakin elinkaaren vaiheita. Voit puhdistaa lakin kevyesti samettiharjalla, vaahtomuovipalalla tai tahranpoistoaineella." />
        </Helmet>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t("capUsage0")}</Title>

                        
                        <H3>{t("capUsage1")}</H3>
                        <Desc>{t("capUsage2")}</Desc>
                        <Desc>{t("capUsage2a")}</Desc>

                        <H3>{t("capUsage3")}</H3>
                        <Desc>{t("capUsage4")}</Desc>


                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default CapUsage