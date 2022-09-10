import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
//import { useTranslation } from "react-i18next";
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
  //const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <ContainerDiv>
        <Navbar/>
            <Container style={{padding: "2% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>VAIHTO JA PALAUTUS</Title>
                        
                        <H3>Yleistä verkkokaupasta</H3>
                        <Desc>
                        Tilaamillasi tuotteilla on 14 päivän palautus ja vaihto-oikeus Suomeen toimitettaviin tilauksiin. Tänä aikana voit palauttaa vastaanottamasi tuotteet tai vaihtaa ne muihin tuotteisiin. Palauttaminen on sinulle maksutonta.
                        </Desc>
                     

                        <H3>Tuotteen palauttaminen</H3>
                        <Desc>Meille on hyvin tärkeää, että olet tyytyväinen tilaukseesi. Sinulla on 14 päivää aikaa tutustua tuotteisiin ja tehdä ostopäätös (kuluttajan suojalain tarkoittama peruuttamisoikeus). Ilmoitus palautuksesta eli peruuttamisoikeuden käyttämisestä on tehtävä Palvelun tarjoajalle 14 päivä kuluessa tuotteiden vastaanottamisesta.</Desc>
                        <Strong>Noudata seuraavia ohjeita, kun palautat tuotteita:</Strong>
                        <List>
                            <ListItem>Palautettavan tuotteen tulee olla käyttämätön ja alkuperäispakkauksessa.</ListItem>
                            <ListItem>Älä tee palaute- tai osoitemerkintöjä myyntipakkaukseen.</ListItem>
                            <ListItem>Tuote pakkauksineen tulee postittaa aina erillisessä paketissa tai pussissa.</ListItem>
                            <ListItem>Täytä lähetyksessä oleva palautusilmoitus ja laita se palautettavan tuotteen mukana pakettiin.</ListItem>
                            <ListItem>Liimaa palautusilmoituksesta löytyvä valmis osoitetarra paketin päälle.</ListItem>
                            <ListItem>Palauta paketti postiin. Palauttaminen on ilmaista vain postitoimipaikasta.</ListItem>
                        </List>
                        
                        <Desc>
                        Huomioithan, että toimituskulumme ovat aina samansuuruiset tuotteiden lukumäärästä riippumatta. Tästä syystä toimituskuluja ei makseta takaisin, vaikka palautus koskisi vain osaa tuotteita.
                        <Br/>
                        Viallisen tuotteen tilalle pyrimme toimittamaan uuden vastaavan tuotteen. Mikäli emme pysty tarjoamaan vaihtotuotetta, saat takaisin palauttamasi tuotteen vastaavan hinnan postikuluineen.
                        <Br/><Br/>
                        Suosittelemme, että pyydät tositteen palautuslähetyksestäsi.
                        Rahat palautetaan Paytrailin kautta samalla maksutavalla, jolla tuote on ostettu.
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