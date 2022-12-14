import { Instagram, MailOutlined, Phone, Room, YouTube } from "@mui/icons-material"
import styled from "styled-components"
import { mobile, smartPhone, tablet, laptop, largeLaptop } from "../responsive"
import { elementBackgroundColor } from "../theme"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router";

const TikTokIcon = ({ color = "#000000" }) => {
    return (
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="80%"
        height="80%"
      >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
      </svg>
    );
};

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
    border: solid 1px black;
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

  
  const goToLink = (link) =>{
    window.location.href= link;
  }
  

  // youtube:  https://www.youtube.com/channel/UCfcLwu9-NMAARiiDQiacWcw
  // instagram: https://www.instagram.com/laatulakki/
  // tiktok: https://www.tiktok.com/@laatulakki


  return (
    <Container>
        <Left>
            <Logo onClick={goToHomePage}>LaatuLakki.fi</Logo>
            <ContactItem><Room style={{marginRight:"10px"}}/> Hyvink???? 05880</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/> +380400269034</ContactItem>
            <ContactItem><MailOutlined style={{marginRight:"10px"}}/> laatulakki@gmail.com</ContactItem>
            <SocialContainer>
                <SocialIcon color="E4405F" onClick={()=> goToLink("https://www.instagram.com/laatulakki/")}>
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="ffffff" onClick={()=> goToLink("https://www.tiktok.com/@laatulakki")}>
                    <TikTokIcon color="ff2a56" />
                </SocialIcon>
                <SocialIcon color="FF0000" onClick={()=> goToLink("https://www.youtube.com/channel/UCfcLwu9-NMAARiiDQiacWcw")}>
                    <YouTube />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>{t("onlineStore")}</Title>
            <List>
                <ListItem onClick={goToTermsPage}>{t("footer1")}</ListItem>
                <ListItem onClick={goToRegistrationStatement}>{t("footer2")}</ListItem>
                <ListItem onClick={goToChange_and_refund}>{t("footer3")}</ListItem>
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