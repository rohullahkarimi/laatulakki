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
        <Navbar/>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>{t("capChoice0")}</Title>
                        
                        <h4>{t("capChoice1a")}</h4>
                        <div>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/FJJ7N287Mjs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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