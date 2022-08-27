import { Facebook, Instagram, MailOutlined, Phone, Room, YouTube } from "@mui/icons-material"
import styled from "styled-components"
import { mobile, smartPhone, tablet, laptop } from "../responsive"
import { elementBackgroundColor } from "../theme"
import { useTranslation } from "react-i18next"


const Container = styled.div`
    display: flex;
    background-color: #${elementBackgroundColor};
    padding: 0px 20%;
    ${tablet({padding: "0px"})}
    ${laptop({padding: "0px 5%"})}
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
`

const SocialContainer = styled.div`
    display: flex;
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
    ${mobile({display: "none"})}
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
`

const ListItem = styled.div`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
     flex: 1;
     padding: 20px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`

`

const Footer = () => {
  const {t} = useTranslation()
  return (
    <Container>
        <Left>
            <Logo>LaatuLakki.fi</Logo>
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
            <Title>Some links in here</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Contact</ListItem>
                <ListItem>About</ListItem>
            </List>
        </Center>
        <Right>
            <Title>{t('payment_options')}</Title>
            <Payment src="https://img.paytrail.com/?id=28740&type=vertical&cols=6;text=1&auth=09ae03d734ced6a7"/>
        </Right>
    </Container>
  )
}

export default Footer