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
            <Container id="starter" style={{padding: "2% 0"}}>
                <Row>
                <Col md={12}>
                    <InfoContainer>
                        <Title>KÄYTTÖEHDOT</Title>
                        
                        <H3>Yleistä verkkokaupasta</H3>
                        <Desc>
                        Verkkokaupan tuotteita myy RohisTech TMI y-tunnus 3189040-5. Myymme tuotteita täysi-ikäisille yksityishenkilöille Suomeen ja EU-alueelle. Tuotteiden hinnat sisältävät arvonlisäveron. Pidätämme oikeuden hintojen ja postikulujen muutoksiin.  
                        <Br/> <Br/>
                        <Strong>Sopimuksen osapuolet</Strong> <Br/>
                        Nämä sopimusehdot koskevat laatulakki.fi-verkkokauppaa (Palvelu), jonka toiminnasta vastaa RohisTech TMI (Palveluntarjoaja), Jussilankatu 1 B 11, 05880 Hyvinkää, Y-tunnus 3189040-5.
                        </Desc>
                        

                        
                        <H3>Yleistä</H3>
                        <Desc>
                        Käyttämällä laatulakki.fi-verkkokauppaa hyväksyt nämä ehdot ja sitoudut noudattamaan niitä.
                        Palveluntarjoajalla on oikeus muuttaa näitä sopimusehtoja julkaisemalla päivitetyt ehdot verkkokaupan sivuilla. Tutustu kulloinkin voimassa oleviin ehtoihin ennen tilauksen lähettämistä.
                        <Br/> <Br/>
                        Verkkokaupasta tilaaminen edellyttää, että noudatat verkkokaupan sopimusehtoja, täytät niiden mukaiset vaatimukset ja annat itseäsi koskevat tiedot kokonaisuudessaan ja totuudenmukaisesti. Sinun tulee korjata itseäsi koskevat virheelliset tiedot viivytyksettä. Käyttäjä vastaa kaikista hänen käyttäjätunnuksellaan ja salasanallaan tehdyistä tilauksista. Käyttäjä on vastuussa käyttäjätunnuksensa ja salasanansa salassapidosta.
                        </Desc>

                        

                        
                        <H3>Käyttöoikeus</H3>
                        <Desc>Palvelu on tarkoitettu yksityisille, täysi-ikäisille kuluttajille. Palvelun sisällön kaikki oikeudet kuuluvat Palveluntarjoajalle.</Desc>

                        

                        
                        <H3>Rekisteröityminen</H3>
                        <Desc>
                        Käyttäjä voi rekisteröityä Palvelun käyttäjäksi täyttämällä rekisteröitymislomakkeen ja valitsemalla itselleen käyttäjätunnuksen sekä salasanan. Käyttäjä voi tilata tuotteita myös rekisteröitymättä.
                        <Br/> <Br/>
                        Tilaamalla tuotteita Käyttäjä vakuuttaa tutustuneensa näihin ehtoihin, hyväksyy ne ja sitoutuu noudattamaan niitä.
                        Rekisteröityminen on maksutonta.
                        </Desc>
                        

                        
                        <H3>Henkilötietojen kerääminen ja käyttö</H3>
                        <Desc>
                        Palveluntarjoaja vastaa käyttäjän antamien tietojen asianmukaisesta käsittelystä ja käyttäjän yksityisyydensuojan säilymisestä. Käyttäjän antamat tiedot tallennetaan Palveluntarjoajan asiakasrekisteriin. Tilauksen suorittamiseksi pakollisia tietoja ovat Käyttäjän etunimi, sukunimi, lähiosoite, postitoimipaikka, maa, sähköpostiosoite ja puhelinnumero. Palveluntarjoaja ei luovuta keräämiään henkilötietoja ulkopuolisille tahoille. Asiakasrekisterin tietoja voidaan käyttää sähköisessä suoramarkkinoinnissa vain, jos Käyttäjä on antanut tähän suostumuksensa.
                        <Br/> <Br/>
                        Palveluntarjoaja pidättää itselleen oikeuden luovuttaa Käyttäjää koskevia tietoja viranomaisten käyttöön, mikäli Käyttäjä on toiminut lain ja hyvän tavan vastaisesti. Käyttäjällä on oikeus tarkastaa, muuttaa tai poistaa itseään koskevat tiedot asiakasrekisteristä.
                        <Br/> <Br/>
                        Käyttäjän antamia tietoja laatulakki.fi-verkkokaupan asiakasrekisteriä varten säädellään rekisteriselosteemme perusteella. Käyttäjä vastaa siitä, että annetut tiedot ovat totta ja täydellisiä ja tietoja päivitetään tarvittaessa. Emme koskaan luovuta tietoja kolmannelle osapuolelle. Liittymällä Laatulakki-verkkokauppa-asiakasrekisteriin suostut säännöllisesti vastaanottamaan viestejä verkkokaupan asiakasrekisteristä. Voit milloin tahansa peruuttaa uutiskirjeet omalla tililläsi tai lähettämällä sähköpostia osoitteeseen laatulakki@gmail.com Voit milloin tahansa poistaa asiakastilisi lähettämällä sähköpostia osoitteeseen laatulakki@gmail.com ja pyytämällä, että asiakastilisi poistetaan. Jos peruutat jäsenyytesi laatulakki.fi-verkkokaupan asiakasrekisterissä, et enää vastaanota viestejä ja joudut rekisteröitymään uudelleen, mikäli haluat liittyä uudelleen laatulakki.fi-verkkokaupan asiakasrekisteriin.
                        </Desc>
                      

                        
                        <H3>Asiakastilitietojen päivittäminen</H3>
                        <Desc>Henkilökohtaisten asiakastilitietojen päivittäminen on mahdollista tehdä kirjautumalla sisään verkkokauppaan ja muuttamalla tietoja kohdassa “Omat tiedot”.</Desc>
                        
                        

                        <H3>Turvallisuus maksamisen yhteydessä</H3>
                        <Desc>Kaikki tiedot ovat salattuja ja siirretään turvallisesti Secure Socker Layersin (SSL) kautta. Siksi kortilla on turvallista maksaa Laatulakki.fi-verkkokaupassa.</Desc>

                        

                        
                        <H3>Verkkokaupasta tilaaminen</H3>
                        <Desc>
                        Palvelusta tilattaessa sitova kauppasopimus syntyy, kun Palvelun tarjoaja lähettää Käyttäjälle tilausvahvistuksen, jossa tuotteen saatavuus ja toimitus vahvistetaan.
                        <Br/>
                        Palvelun tarjoaja pidättää oikeuden olla hyväksymättä tilausta.
                        <Br/> <Br/>
                        Voit tutustua tilaamiisi tuotteisiin ja varmistua kaikessa rauhassa, että ne ovat sinulle mieleisiä ja sopivia. Tuotteen saatavuus ja arvioitu toimitusaika ilmoitetaan tilauksen yhteydessä. Jos tuote ei vastaa odotuksiasi, voit palauttaa tai vaihtaa sen 14 päivän kuluessa tuotteen vastaanottamisesta. Vaihto- ja palautusoikeus koskee vain käyttämättömiä tuotteita ja tuotepakkausten tulee olla myyntikuntoisia.
                        <Br/> <Br/>
                        Normaalitilaukset toimitetaan ilmoittamaasi toimitusosoitetta lähinnä sijaitsevaan postiin tai smart -postiin. Sinulle lähetetään saapumisilmoitus, kun tilauksesi on noudettavissa.
                        <Br/> <Br/>
                        Hyväksymällä Laatulakki -verkkokaupan tilaus- ja toimitusehdot asiakas hyväksyy, että Fredrikson.fi -verkkokauppa lähettää asiakkaalle sähköpostia tai tekstiviestejä tilaukseen liittyvissä asioissa.
                        </Desc>

                        

                        
                        <H3>Tuotteiden hinnat</H3>
                        <Desc>
                        Tuotteen hinta on Palvelun sivulla tuotetietojen yhteydessä tilaushetkellä näkyvä hinta.<Br/>
                        Hintaan lisätään toimituskulut, maksu on tilauskohtainen, ellei toisin mainita.
                        <Br/> <Br/>
                        Kulloinenkin toimitusmaksu ilmenee Palvelussa ennen tilauksen suorittamista. Palvelussa hinnat ja kuljetuskustannukset ilmoitetaan Käyttäjälle euroissa (EUR).<Br/>
                        Myytäessä ja kuljetettaessa tuotteita hinnat sisältävät Suomen lainsäädännön mukaisen arvonlisäveron.
                        </Desc>

                        

                        
                        <H3>Tuotteen toimittaminen</H3>
                        <Desc>
                        Palvelun tarjoaja toimittaa myymänsä tuotteet Käyttäjälle kolmannen osapuolen kanssa tekemänsä kuljetussopimuksen perusteella.
                        Kuljetuskustannukset lisätään tilauksen hintaan. Kunkin tilauksen kuljetuskustannukset ilmenevät Ostoskori-osiossa.
                        Tuotteiden toimitusajat määräytyvät tuotekohtaisesti. Toimitusaika riippuu tuotteen saatavuudesta ja lähetyksen määränpäästä. Kun tuotetta löytyy varastostamme, on toimitusaika yleensä noin 5 arkipäivää. Kun tilaus sisältää useampia tuotteita, ne toimitetaan yhteislähetyksenä. Voimassa olevat toimitustavat ilmenevät kulloinkin Palvelusta.
                        <Br/> <Br/>
                        Palvelun tarjoaja ei vastaa ylivoimaisen esteen (force majeure) aiheuttamista viivästymisistä tai viivästyneen toimituksen aiheuttamista välillisistä haitoista. Toimipisteeseen tai pakettiautomaattiin toimitettavissa lähetyksissä Postilla on oikeus poiketa toimitusosoitteesta mikäli tilapäisen ylivoimaisen esteen vuoksi lähetystä ei voida toimittaa noudettavaksi alkuperäisen osoitteen mukaiseen paikkaan.
                        <Br/> <Br/>
                        Palvelun tarjoaja varaa itselleen oikeuden toimittaa tilatut tuotteet eri lähetyksissä. Palveluntarjoaja vastaa tuotteen häviämisestä tai rikkoutumista kuljetuksen aikana.
                        Saat hyväksymästäsi tilauksesta sähköisen tilausvahvistuksen, josta voit tarkistaa tilauksesi tiedot. Säilytä tilausvahvistus mahdollista myöhempää tarvetta varten. Voit esimerkiksi tulostaa tilausvahvistuksen verkkokaupasta.
                        </Desc>

                        <H3>Tilausten seuranta</H3>
                        <Desc>Tilauksen yhteydessä asiakkaalle toimitetaan aina sähköpostitse tilausvahvistus, joka sisältää tilauskohtaisen seuranta tunnuksen. Tunnuksen syöttämällä Postin seurantapalveluun, voit seurata tuotteen toimituksen vaiheita www.posti.fi</Desc>


                        <H3>Tuotteen palauttaminen</H3>
                        <Desc>Meille on hyvin tärkeää, että olet tyytyväinen tilaukseesi. Sinulla on 14 päivää aikaa tutustua tuotteisiin ja tehdä ostopäätös (kuluttajan suojalain tarkoittama peruuttamisoikeus). Ilmoitus palautuksesta eli peruuttamisoikeuden käyttämisestä on tehtävä Palvelun tarjoajalle 14 päivä kuluessa tuotteiden vastaanottamisesta.</Desc>
                        <Strong>Noudatathan seuraavia ohjeita tuotteen palautuksen yhteydessä:</Strong>
                        <List>
                            <ListItem>Verkkokäyttäytymiseen liittyvät tiedot</ListItem>
                            <ListItem>Yhteydenottolomakkeella ilmoitetut tiedot, kuten etunimi, sukunimi, yhteystiedot (puhelinnumero, sähköpostiosoite) tai muut rekisteröidyn itse ilmoittamat tiedot</ListItem>
                            <ListItem>rekisteröidyn selaimen rekisterinpitäjän palvelimelle lähettämät tekniset tiedot sekä rekisteröidyn selaimelle lähetetyt evästeet ja niihin liittyvät tiedot</ListItem>
                            <ListItem>Tilaamillasi tuotteilla on 14 päivän palautus ja vaihto-oikeus.</ListItem>
                            <ListItem>Tänä aikana sinulla on mahdollista palauttaa vastaanottamasi tuotteet tai vaihtaa ne muihin tuotteisiin.</ListItem>
                            <ListItem>Palautettavan tuotteen tulee olla käyttämätön ja alkuperäispakkauksessa. Mikäli olet käyttänyt tuotetta tai käsitellyt sitä huolimattomasti, vastaat tuotteen arvon alentumisesta enintään tuotteen täyteen arvoon saakka.</ListItem>
                            <ListItem>Palaute -tai osoitemerkintöjä ei saa tehdä myyntipakkaukseen, ja tuote pakkauksineen tulee aina postittaa erillisessä paketissa tai pussissa.</ListItem>
                            <ListItem>Täytä lähetyksessä oleva palautusilmoitus ja laita se palautettavan tuotteen mukana pakettiin.</ListItem>
                            <ListItem>Toimituskulut ovat aina samansuuruiset, tuotteiden lukumäärästä riippumatta. Tästä syystä toimituskuluja ei makseta takaisin, jos palautus koskee vain osaa tuotteista.</ListItem>
                            <ListItem>Mikäli olet vastaanottanut viallisen tai väärän tuotteen, palauta se näiden ohjeiden mukaisesti. Merkitse palautusilmoitukseen miten vika ilmenee, ja haluatko ehjän/oikean tuotteen tilalle. Kun kyseessä on viallinen tai väärä tuote, vastaamme uuden vastaavan tuotteen lähetyskuluista. Mikäli emme pysty tarjoamaan vaihtotuotetta, saat takaisin palauttamasi tuotteen vastaavan hinnan postikuluineen.</ListItem>
                            <ListItem>Palautuksessa tarvittava osoitetarra tulee liimata lähetyspakkauksen päälle. Palauttaminen on sinulle maksutonta, mikäli lähetät palautuksen normaalina lähetyksenä ja lähetyspaikka on Suomessa.</ListItem>
                            <ListItem>Palautuksesta ei tarvitse ilmoittaa meille etukäteen.</ListItem>
                            <ListItem>Palauttaminen on ilmaista ainoastaan postitoimipaikasta.</ListItem>
                            <ListItem>Suosittelemme, että pyydät tositteen palautuslähetyksestä.</ListItem>
                            <ListItem>Rahat palautetaan Paytrailin kautta samalle maksutavalle, jolla tuote on ostettu.</ListItem>
                            <ListItem>Mikäli tuote on kadonnut kuljetuksen aikana, vioittunut tai asiakkaalle on toimitettu väärä tuote, tulee asiakkaan ilmoittaa virheestä välittömästi osoitteeseen laatulakki@gmail.com Ilmoitus virheellisestä toimituksesta tai viallisesta tuotteesta on tehtävä 14 päivän sisällä tuotteen vastaanottamisesta. Jos paketti on vioittunut postissa, on tuotteesta tehtävä välittömästi reklamaatio postiin.</ListItem>
                        </List>
                        

                        <H3>Maksupalvelutarjoaja</H3>
                        <Desc>Maksunvälityspalvelun toteuttajana ja maksupalveluntarjoajana toimii Paytrail Oyj (2122839-7) yhteistyössä suomalaisten pankkien ja luottolaitosten kanssa. Paytrail Oyj näkyy maksun saajana tiliotteella tai korttilaskulla ja välittää maksun kauppiaalle. Paytrail Oyj:llä on maksulaitoksen toimilupa. Reklamaatiotapauksissa pyydämme ottamaan ensisijaisesti yhteyttä tuotteen toimittajaan.</Desc>
                        <Desc>
                        Paytrail Oyj, y-tunnus: 2122839-7<Br/>
                        Innova 2<Br/>
                        Lutakonaukio 7<Br/>
                        40100 Jyväskylä<Br/>
                        Puhelin: 0207 181830<Br/>
                        www.paytrail.com<Br/>
                        </Desc>

                        <H3>Tekijänoikeudet</H3>
                        <Desc>
                        Sivuston sisältö on suojattu tekijänoikeuslain mukaisesti. Palveluntarjoaja pidättää itsellään kaikki oikeudet sivuihin ja niiden sisältöön, jollei näissä käyttöehdoissa tai sivuilla toisin mainita. Sivuston sisällön tai sen osan kopioiminen, jakelu tai tallentaminen on kiellettyä ilman Palveluntarjoajan etukäteistä kirjallista suostumusta lukuun ottamatta erikseen mainittuja poikkeuksia.
                        <Br/><Br/>
                        Tekstiä, kuvia tai logoja ei saa käyttää kaupallisiin tai hyvien tapojen vastaisiin tarkoituksiin. Sivustoa saa katsella ja selata sekä tulostaa käyttäjän omaa, henkilökohtaista käyttöä varten. Sivuston sisällön osittainenkin jakeleminen on kiellettyä ilman Palveluntarjoajan erillistä kirjallista suostumusta.
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