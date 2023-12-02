import React, { useState } from 'react'; // Make sure you have this import
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
import { mobile } from "../responsive"
import {Helmet} from "react-helmet";

import {
    Container, Row, Col
  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


  

const ContainerDiv = styled.div`
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})}
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 3%;
`

const H3 = styled.h3`
    
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Button = styled.button`
padding: 8px 30px;
background-color: white;
color: black;
cursor: pointer;
font-weight: 600;
border: 2px solid white;
border-radius: 0px;
transition: background-color 0.3s ease 0s, color 0.3s ease 0s;
background-color: ${(props) => (props.selected ? 'black' : '#e7e7e7')};
color: ${(props) => (props.selected ? '#e7e7e7' : 'black')};
border: none;
`;


const Desc = styled.p`
    margin: 20px 0px;
`




const CapChoice = () => {
  const { t } = useTranslation();
  //const location = useLocation();
  const navigate = useNavigate()
  const [selectedButton, setSelectedButton] = useState('sell');
  
    const handleBuyClick = () => {
        setSelectedButton('buy');
        navigate('/marketplace');
    };

    const handleSellClick = () => {
        setSelectedButton('sell');
        navigate('/marketplace/sell'); // Redirect to the sell page
    };

  return (
    <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Myy ylioppilaslakki tai muita ammattilakkeja meille</title>
            <meta name="description" content="Tarjoamme laadukkaita käytettyjä ylioppilaslakkeja, jotka ovat täydellinen valinta ympäristötietoisille ostajille. Ostaessasi käytetyn ylioppilaslakin edistät kestävää kehitystä ja osallistut kestävään kulutukseen. Tutustu valikoimaamme ja löydä täydellinen ylioppilaslakki muistoksi tärkeästä päivästäsi." />
        </Helmet>
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t('sellPageTitle')}</Title>
                        <ButtonContainer>
                            <Button selected={selectedButton === 'buy'} onClick={handleBuyClick}>{t('buy')}</Button>
                            <Button selected={selectedButton === 'sell'} onClick={handleSellClick}>{t('sell')}</Button>
                        </ButtonContainer>
                        <Desc>
                            {t('sellPage1')}
                        </Desc>

                        <H3>{t('sellPage2')}</H3>
                        <Desc>{t('sellPage3')}</Desc>

                        <H3>{t('sellPage4')}</H3>
                        <Desc>{t('sellPage5')}</Desc>

                        <H3>{t('sellPage6')}</H3>
                        <Desc>{t('sellPage7')}</Desc>

                        <H3>{t('sellPage8')}</H3>
                        <Desc>{t('sellPage9')}</Desc>

                        <Desc>{t('sellPage10')}</Desc>

                        <Desc>{t('sellPage11')}</Desc>

                    </InfoContainer>
                </Col>
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default CapChoice