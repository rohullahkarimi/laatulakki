import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
//import { useTranslation } from "react-i18next";
import { mobile } from "../responsive"
import { bodyColor } from "../theme"
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';

const Container = styled.div`
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex; 
    //background-color: #${bodyColor};
    ${mobile({padding: "10px", flexDirection: "column"})}
`


const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
`



const Product = () => {
  //const { t } = useTranslation();
  //const location = useLocation();
  

  return (
    <Container>
        <Navbar/>
            <Wrapper>
                <InfoContainer>
                    <Title>Vaihto ja palautus</Title>
                    <Desc>test</Desc>
                </InfoContainer>
            </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Product