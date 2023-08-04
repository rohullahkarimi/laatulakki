import React from 'react'; // Make sure you have this import
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
//import { mobile } from "../responsive"
import {
    Container, Row, Col
  } from 'react-bootstrap';
import { buttonColor } from "../theme"
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";


  
const ContainerDiv = styled.div`
`
/*
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
*/

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 15px 0;
`

const Button = styled.button`
    flex: 8;
    border: none;
    width: 25%;
    background-color: #${buttonColor};
    color: white;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
`

const Story = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>TARINAMME -  LAATULAKKI - YLIOPPILASLAKKI</title>
            <meta name="description" content="Tarinamme: Perustimme Laatulakki-yrityksen kesällä 2022 ajatuksella, että haluamme tarjota opiskelijoille laadukkaita ja edullisia ylioppilaslakkeja nopealla toimituksella... " />
        </Helmet>
        <Navbar/>
           
            <Container id="starter" style={{padding: "2% 0px 1% 0"}}>

                <Row>
                <Col md={12}>
                    <section id="projects" className="projects-section">
                        <div className="container">


                        <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                            <div className="col-xl-8 col-lg-7">
                            <img className="img-fluid mb-3 mb-lg-0" src="https://www.laatulakki.fi/images/ylioppilaslakki_ruusu.JPG" alt=""/>

                            </div>
                            <div className="col-xl-4 col-lg-5">
                            <div className="featured-text text-center text-lg-left">
                                <h4>{t('footer0').toUpperCase()}</h4>
                                <p className="text-black-50 mb-0">{t('our_story1')}</p>
                            </div>
                            </div>
                        </div>

                    
                        <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
                            <div className="col-lg-6 mb-3">
                            <img className="img-fluid" src="https://www.laatulakki.fi/images/rohullah_karimi_afghanistan.JPG" alt=""/>

                            </div>
                            <div className="col-lg-6 mb-3">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                <div className="project-text w-100 my-auto text-center text-lg-left">
                                    <h4 className="text-white">AFGHANISTAN 2013</h4>
                                    <p className="mb-0 text-white-50">{t('our_story2')}</p>
                                    <hr className="d-none d-lg-block mb-0 ml-0"/>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>


                        <div className="row justify-content-center no-gutters">
                            <div className="col-lg-6 mb-3" align="center">
                            <img className="img-fluid" src="https://www.laatulakki.fi/images/rohullah_karimi_graduated.jpg" alt=""/>
                            </div>
                            <div className="col-lg-6 mb-3 order-lg-first">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                <div className="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 className="text-white">{t('hope1')}</h4>
                                    <p className="mb-0 text-white-50">{t('our_story3')} </p>
                                    <hr className="d-none d-lg-block mb-0 mr-0"/>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
                            <div className="col-lg-6 text-center">
                            <iframe width="427" height="759" src="https://www.youtube.com/embed/OIgnSis_tcU" title="Pakataan tilaus yhdessä 🫶Tilausten pakkaaminen on suosikki osani koko prosessista. 😍" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                            <div className="col-lg-6">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                <div className="project-text w-100 my-auto text-center text-lg-left">
                                    <h4 className="text-white">{t('truth')}</h4>
                                    <p className="mb-0 text-white-50">{t('our_story4')}</p>
                                    <hr className="d-none d-lg-block mb-0 ml-0"/>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>


                        </div>
                    </section>    


                    <InputContainer>
                        <Button onClick={()=>navigate("/product/perinteinen-suomalainen-ylioppilaslakki/"+process.env.REACT_APP_PRODUCT_PAGE)}>
                            {t('buy')}
                        </Button>
                    </InputContainer>

                </Col>     
                </Row>
            </Container>
        <Footer/>
    </ContainerDiv>
  )
}

export default Story