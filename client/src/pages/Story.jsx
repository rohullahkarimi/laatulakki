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



const Desc = styled.p`
    margin: 20px 0px;
`



const Story = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t('footer0')}</Title>

                        <Desc>{t('our_story1')}</Desc>

                        <Desc>{t('our_story2')}</Desc>

                        <Desc>{t('our_story3')}</Desc>

                        <Desc>{t('our_story4')}</Desc>
                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Story