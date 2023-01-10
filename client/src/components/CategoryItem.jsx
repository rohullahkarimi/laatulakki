import styled from 'styled-components'
import { mobile, smartPhone } from '../responsive'
import {
    Link
  } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 70vh; 
    position: relative;
`


const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    /*${mobile({height: "20vh"})}*/
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`


const Title = styled.h1`
    color: #009291;
    margin-bottom: 80%;
    font-size: 22px;
    backdrop-filter: blur(6px);
    ${smartPhone({marginBottom: "50%"})}
    ${mobile({marginBottom: "60%"})}
`


const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = () => {
  const { t } = useTranslation();
  return (
    <>
    <Container>
        <Link to={`/products/ylioppilaslakki`}>
            <Image src="https://www.fredrikson.fi/wp-content/uploads/2021/03/ylioppilaslakit.jpg"/>
            <Info>
                <Title>{t("highSchoolCap").toUpperCase()}</Title>
                <Button>{t("buy_now").toUpperCase()}</Button>
            </Info>
        </Link>
    </Container>

    
    <Container className="hide_in_mobile">
            <Link to={`/products/ylioppilaslakki`}>
                <Image src="https://www.fredrikson.fi/wp-content/uploads/2021/03/ammattilakki-lr.jpg"/>
                <Info>
                    <Title>{t("engineerCap").toUpperCase()}</Title>
                    <Button>{t("buy_now").toUpperCase()}</Button>
                </Info>
            </Link>
    </Container>

    <Container className="hide_in_mobile">
            <Link to={`/products/ylioppilaslakki`}>
                <Image src="https://www.fredrikson.fi/wp-content/uploads/2021/03/valmistujaislakit.jpg"/>
                <Info>
                    <Title>{t("graduationCap").toUpperCase()}</Title>
                    <Button>{t("buy_now").toUpperCase()}</Button>
                </Info>
            </Link>
    </Container>

  
    </>
  )
}

export default CategoryItem