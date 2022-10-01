import { Facebook, Instagram, MailOutlined, Phone, Room, YouTube } from "@mui/icons-material"
import styled from "styled-components"
import { mobile, smartPhone, tablet, laptop, largeLaptop } from "../responsive"
import { elementBackgroundColor } from "../theme"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router";


const Container = styled.div`
    display: flex;
    background-color: #${elementBackgroundColor};
    padding: 0 15%;
    ${largeLaptop({padding: "0px 10%"})}
    ${laptop({padding: "0px 5%"})}
    ${tablet({padding: "0px"})}
    ${smartPhone({flexDirection: "column", padding: "0px"})}
    ${mobile({flexDirection: "column", padding: "0px"})}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

`

const Logo = styled.h1`
    margin-bottom: 30px;
    cursor: pointer;
`

const SocialContainer = styled.div`
    display: flex;
    cursor: pointer;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
`

const Title = styled.h3`
   margin-bottom: 30px;
`

const List = styled.ul`
     margin: 0;
     padding: 0;
     list-style: none;
     display: flex;
     flex-wrap: wrap;
     cursor: pointer;
`

const ListItem = styled.div`
    width: 100%;
    margin-bottom: 10px;
`

const Right = styled.div`
     flex: 2;
     padding: 20px;
     ${smartPhone({flex: "1"})}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const ImgContainer = styled.div`
    width: auto;
    height: 200px;
    background-size: contain;
    background-image: url("https://www.paytrail.com/hs-fs/hubfs/Logot-Kayttoonotto/Paytrail-banneri-kaikki-maksutavat.png?width=800&name=Paytrail-banneri-kaikki-maksutavat.png");
    background-repeat: no-repeat;
    ${smartPhone({backgroundRepeat: "no-repeat", boxSizing: "border-box", width: "100%", height: "700px !important", backgroundImage: "url('https://www.paytrail.com/hs-fs/hubfs/Logot-Kayttoonotto/Paytrail-banneri-pysty-kaikki-maksutavat.png?width=161&name=Paytrail-banneri-pysty-kaikki-maksutavat.png')"})}
`
const Payment = styled.img`
 
`

const Footer = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const goToTermsPage = () =>{
    navigate('/terms_and_condition#starter');
  } 
  const goToRegistrationStatement = () =>{
    navigate('/registration_statement');
  } 
  const goToChange_and_refund = () =>{
    navigate('/change_and_refund');
  } 
  const goToHomePage = () =>{
    navigate('/');
  } 

  return (
    <Container>
        <Left>
            <Logo onClick={goToHomePage}>LaatuLakki.fi</Logo>
            <ContactItem><Room style={{marginRight:"10px"}}/> Hyvinkää 05880</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/> +380400269034</ContactItem>
            <ContactItem><MailOutlined style={{marginRight:"10px"}}/> laatulakki@gmail.com</ContactItem>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="FF0000">
                    <YouTube/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Verkkokauppa</Title>
            <List>
                <ListItem onClick={goToTermsPage}>Käyttöehdot</ListItem>
                <ListItem onClick={goToRegistrationStatement}>Rekisteriseloste</ListItem>
                <ListItem onClick={goToChange_and_refund}>Vaihto ja palautus</ListItem>
            </List>
        </Center>
        <Right>
            <Title>{t('payment_options')}</Title>
            <ImgContainer>
                <Payment />
            </ImgContainer>
            
        </Right>
    </Container>
  )
}

export default Footer