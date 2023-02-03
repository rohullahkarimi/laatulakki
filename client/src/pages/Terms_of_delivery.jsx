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


const Desc = styled.p`
    margin: 20px 0px;
`

const Strong = styled.strong`
`


const TermsOfDelivery = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t('deliveryTerms_0')}</Title>
                        <H3>{t('deliveryTerms_1')}</H3>
                        <Desc>{t('deliveryTerms_2')}</Desc>

                        <H3>{t('deliveryTerms_3')}</H3>

                        <Strong>{t('deliveryTerms_4')}</Strong>
                        <Desc>{t('deliveryTerms_5')}</Desc>

                        <Desc>{t('deliveryTerms_6')}</Desc>
                        <Desc>{t('deliveryTerms_7')}</Desc>

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default TermsOfDelivery