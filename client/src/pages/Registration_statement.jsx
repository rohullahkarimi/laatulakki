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
                        <Title>VERKKOSIVUN REKISTERISELOSTE</Title>
                        
                        <H3>REKISTERIN PITÄJÄ</H3>
                        <Desc>
                        RohisTech tmi<Br/>
                        Jussilankatu 1 B 11,<Br/>
                        05880 Hyvinkää<Br/>
                        <Br/>
                        Y-tunnus: 3189040-5<Br/>
                        Vaihde: 040 026 9034<Br/>
                        rohistech@gmail.com<Br/>
                        </Desc>
                        

                        
                        <H3>YHTEYSHENKILÖ REKISTERIÄ KOSKEVISSA ASIOISSA</H3>
                        <Desc>
                        Rohullah Karimi<Br/>
                        rohistech@gmail.com<Br/>
                        <Br/>
                        RohisTech tmi<Br/>
                        Jussilankatu 1 B 11,<Br/>
                        05880 Hyvinkää
                        </Desc>

                        

                        
                        <H3>REKISTERIN NIMI</H3>
                        <Desc>RohisTech verkkosivurekisteri</Desc>

                        

                        
                        <H3>HENKILÖTIETOJEN KÄSITTELYN TARKOITUS</H3>
                        <Desc>
                        Verkkosivujen kautta rekisteröityjen henkilötietoja käytetään verkkosivujen kehittämiseen ja käyttäjäkokemuksen parantamiseen. Verkkosivujen yhteydenottolomakkeilla tulleet henkilötiedot käsitellään yhteydenottojen käsittelyyn tarkoitetulla tarkoituksenmukaisella tavalla.
                        <Br/>
                        Verkkosivun kävijöistä voidaan kerätä tietoja verkkosivukäyttäytymisestä, kuten liikkuminen laatulakki:n verkkosivustolla, käytetty aika sivustolla ja sivuilla sekä liikenteen tulolähde. Näitä tietoja käytetään laatulakki:n verkkosivujen käyttäjäkokemuksen kehittämiseen sekä palvelun laadun parantamiseen, jotta käyttäjää kiinnostava tieto olisi entistä helpommin verkkovierailijan saavutettavissa.
                        </Desc>
                        

                        
                        <H3>REKISTERIN SISÄLTÄMÄT TIEDOT</H3>
                        <Desc>Rekisterissä voidaan käsitellä kaikista rekisteröidyistä seuraavia tietoja:</Desc>
                        <List>
                            <ListItem>Verkkokäyttäytymiseen liittyvät tiedot</ListItem>
                            <ListItem>Yhteydenottolomakkeella ilmoitetut tiedot, kuten etunimi, sukunimi, yhteystiedot (puhelinnumero, sähköpostiosoite) tai muut rekisteröidyn itse ilmoittamat tiedot</ListItem>
                            <ListItem>rekisteröidyn selaimen rekisterinpitäjän palvelimelle lähettämät tekniset tiedot sekä rekisteröidyn selaimelle lähetetyt evästeet ja niihin liittyvät tiedot</ListItem>
                        </List>
                        

                        
                        <H3>SÄÄNNÖNMUKAISET TIETOLÄHTEET</H3>
                        <Desc>Rekisteröityjen tiedot saadaan rekisteröidyn selaimen lähettämistä teknisistä tiedoista ja evästeistä, jos käyttäjä ei ole estänyt niiden käyttöä. Yhteydenottolomakkeella tulevat tiedot ovat rekisteröidyn itsensä lähettämät tiedot suojatulla verkkolomakkeella suoraan LTQ:lle eikä näitä tietoja luovuteta kolmansille osapuolille.</Desc>
                        
                        

                        <H3>Käyttäjänseuranta</H3>
                        <Desc>Käytämme HotJar käyttäjänseurantaa seurataksemme miten käyttäjämme liikkuvat nettisivuillamme.  Tarkista Hotjar:n Marketing Technologies tietosuojakäytäntö ( https://www.hotjar.com/legal/policies/terms-of-service/ ) tietääksesi enemmän siitä mitä järjestelmässä seurataan. GDPR mielessä me toimimme kontrollerina ja Hotjar:n datan prosessorina. Mikäli et halua, että sinua seurataan voit tyhjentää selaimesi välimuistin. </Desc>

                        

                        
                        <H3>TIETOJEN LUOVUTUS JA TIETOJEN POISTO</H3>
                        <Desc>Rekisteröidyn tietoja ei luovuteta ulkopuolisille osapuolille ilman erillistä lupaa rekisteröidyltä. Tietoja voidaan luovuttaa viranomaiselle lainsäädäntöön perustuvalla tavalla. Rekisteröity voi esittää kirjallisen tietopyynnön omien tietojensa osalta tai pyytää tietojensa poistamista ottamalla yhteyttä rekisterin yhteyshenkilöön sähköpostitse tai kirjeellä.</Desc>

                        

                        
                        <H3>REKISTERIN SUOJAUS</H3>
                        <Desc>Rekisteri on suojattu tietosuojalain mukaisesti. Rekisteri on suojattu mm. salasanoin, palomuurilla ja SSL -suojauksella. Verkkosivun käyttäjärekisteriin ja yhteydenottolomakkeiden rekisteriin on pääsy vain Laatulakki tarkoin määrittelemillä henkilöillä. Rekisterin tietoja käyttävillä on vaitiolovelvollisuus. Rekisterin tietoja ei siirry manuaaliseksi aineistoksi.</Desc>

                        

                        
                        <H3>EVÄSTEET JA NIIDEN KÄYTTÖ</H3>
                        <Desc>
                        Laatulakki käyttää verkkosivustollaan Google Inc. (”Google”) tarjoamaa Google Analytics -ohjelmistoa. Google Analytics yksilöi käyttäjän evästeillä (engl. cookies). Sivuston käyttöä koskevat tiedot välitetään ja säilytetään Googlen palvelimilla mm. Yhdysvalloissa.
                        <Br/><Br/>
                        Eväste on pieni, käyttäjän tietokoneelle lähetettävä ja siellä säilytettävä tekstitiedosto, joka mahdollistaa verkkosivujen ylläpitäjän tunnistamaan usein sivuilla vierailevat kävijät ja mahdollistamaan verkkosivuanalyysin laatimisen kävijöistä. Evästeeseen tallentuvat tiedot siitä, kuinka käytät verkkosivustoa, ja mm. IP-osoite. Evästeet eivät vahingoita käyttäjien tietokoneita tai tiedostoja. Google käyttää tätä tietoa koostaakseen verkkosivuston käytöstä raportteja, joita käytetään kävijämäärätilastointiin ja palvelun parantamiseen. Evästeiden kautta saatavaa henkilötietoa (IP -osoite) ei yhdistetä muihin rekistereihin.
                        <Br/><Br/>
                        Käyttäjä voi estää evästeiden käytön valitsemalla selaimensa asetuksista evästeiden estämisen, katso selainkohtaiset ohjeet palveluntarjoajaltasi.
                        <Br/><Br/>
                        Lisätietoja Googlen analytiikkaseurannasta Googlen tietosuojasivulta.
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