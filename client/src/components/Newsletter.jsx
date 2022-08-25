import { Send } from "@mui/icons-material"
import { useRef } from "react"
import styled from "styled-components"
import { mobile } from "../responsive"
import { buttonColor } from "../theme"
import emailjs from '@emailjs/browser';

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
    padding: 10px 0px;
    margin: 10px;
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
    margin: 10px;
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
    padding: 10px 0px;
`


const Newsletter = () => {
    const form = useRef();

    const sendEmail = (e) =>{
        e.preventDefault();

        emailjs.sendForm('service_srv6qgs', 'template_r0ct2ft', form.current, '4Nkqb0xXpHyb_vl_z82dEQ')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

   return (
    <Container>
        <form ref={form} onSubmit={sendEmail}>
            <Title>Yhteystiedot</Title>
            <Desc>Asiakaspalvelumme tavoitat parhaiten älä lomakkeen alta tai osoitteesta laatulakki@gmail.com.</Desc>
            <InputContainer>
                <Input name="name" placeholder="Nimi" onChange={(e) => setName(e.target.value)}/>
            </InputContainer>
            <InputContainer>
                <Input name="email" placeholder="Sähköposti" onChange={(e) => setEmail(e.target.value)} />
            </InputContainer>
            <TextAreaContainer>
                <TextArea name="text" placeholder="Kirjoita tähän viestisi..." onChange={(e) => setText(e.target.value)}/>
            </TextAreaContainer>
            <InputContainer>
                <Button onClick={sendEmail}>
                    Lähetä 
                    <Send style={{marginLeft: "5px"}}/>
                </Button>
            </InputContainer>
        </form>
    </Container>
  )
}

export default Newsletter