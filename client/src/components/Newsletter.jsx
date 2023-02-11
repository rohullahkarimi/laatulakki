import { Send } from "@mui/icons-material"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { buttonColor } from "../theme"
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import '../common/css/style.css';
import { useTranslation } from "react-i18next";


const Container = styled.div`
    height: auto;
    background-color: #fcf5f5;
    padding: 20px 0px;
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 10px;
    width: 534px;
    margin: auto;
    background: #ffffff;
    ${tablet({width: "400px"})}
    ${mobile({width: "80%"})}
`


const Title = styled.h1`
    font-size: 26px;
    margin-bottom: 2px;
    ${mobile({fontSize: "30px"})}
`

const Desc = styled.div`
    font-size: 18px;
    font-weight: 300;
    margin: 15px 0;
    width: 80%;
    ${mobile({fontSize: "16px", textAlign: "center", padding: "0px 10px"})}
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    ${mobile({width: "80%"})}
`

const Input = styled.input`
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    width: auto;
`

const TextAreaContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    ${mobile({width: "80%"})}
`

const TextArea = styled.textarea`
    padding: 15px;
    min-height: 150px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid gray;
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
    const { t } = useTranslation();
  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        //console.log(data);
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, data, process.env.REACT_APP_EMAILJS_API_KEY)
        .then((result) => {
            console.log(result.text);
            alert(t("sentThanks"));
            reset()
        }, (error) => {
            console.log(error.text);
        });
    }
    
   

   return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>{t('contact_form')}</Title>
            <Desc>{t('feedback_desc')}</Desc>
            <InputContainer>
                <Input placeholder={t('feedback_name')+" *" } {...register('user_name', { required: true })} />
                <span className="formErrors">{errors.user_name?.message}</span>
            </InputContainer>
            <InputContainer>
                <Input  className="formInput" type="email" placeholder={t('feedback_email')+" *" } {
                    ...register("user_email", { 
                    required: t('emailRequired') + "*", 
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: t('enterEmail'),
                    },
                })} />
                <span className="formErrors">{errors.user_email?.message}</span>
            </InputContainer>
            <TextAreaContainer>
                <TextArea placeholder={t('feedback_message')+" *" } {...register('user_message', { required: true })}/>
                <span className="formErrors">{errors.user_message?.message}</span>
            </TextAreaContainer>

            <InputContainer>
                <Button type="submit" >
                    {t("send_button")} 
                    <Send style={{marginLeft: "5px"}}/>
                </Button>
            </InputContainer>
        </Form>
    </Container>
  )
}

export default Newsletter