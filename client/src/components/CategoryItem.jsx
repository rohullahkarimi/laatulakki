import styled from 'styled-components'
import { mobile, smartPhone } from '../responsive'
import {
    Link
  } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh; 
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height: "20vh"})}
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
    ${smartPhone({marginBottom: "10%"})}
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
        <Link to={`/products/lakki`}>
            <Image src="https://www.fredrikson.fi/wp-content/uploads/2021/03/ylioppilaslakit.jpg"/>
            <Info>
                <Title>{t("highSchoolCap").toUpperCase()}</Title>
                <Button>{t("buy_now").toUpperCase()}</Button>
            </Info>
        </Link>
    </Container>

    <Container>
        <Link to={`/products/lakki`}>
            <Image src="https://www.fredrikson.fi/wp-content/uploads/2021/03/ammattilakki-lr.jpg"/>
            <Info>
                <Title>{t("engineerCap").toUpperCase()}</Title>
                <Button>{t("buy_now").toUpperCase()}</Button>
            </Info>
        </Link>
    </Container>

    <Container>
        <Link to={`/products/lakki`}>
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