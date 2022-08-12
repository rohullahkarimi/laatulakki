import { Send } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"
import { buttonColor } from "../theme"

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 2px;
    ${mobile({fontSize: "30px"})}
`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({fontSize: "16px", textAlign: "center", padding: "0px 10px"})}
`

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    flex-direction: column;
    margin-bottom: 5px;
    ${mobile({width: "80%"})}
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`

const TextAreaContainer = styled.div`
    width: 50%;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    flex-direction: column;
    margin-bottom: 5px;
    ${mobile({width: "80%"})}
`

const TextArea = styled.textarea`
    border: none;
    flex: 8;
    padding-left: 20px;
`

const Button = styled.button`
    flex: 8;
    border: none;
    background-color: #${buttonColor};
    color: white;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Newsletter = () => {
  return (
    <Container>
        <Title>Yhteystiedot</Title>
        <Desc>Asiakaspalvelumme tavoitat parhaiten älä lomakkeen alta tai osoitteesta laatulakki@gmail.com.</Desc>
        <InputContainer>
            <Input placeholder="Nimi"/>
        </InputContainer>
        <InputContainer>
            <Input placeholder="Sähköposti"/>
        </InputContainer>
        <TextAreaContainer>
            <TextArea placeholder="Kirjoita tähän viestisi..."/>
        </TextAreaContainer>
        <InputContainer>
            <Button>
                Lähetä 
                <Send style={{marginLeft: "5px"}}/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter