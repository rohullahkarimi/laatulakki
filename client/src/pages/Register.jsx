import styled from "styled-components";
import FormInput from "../components/FormInput/FormInput";
import { useState, useEffect } from "react";
import { brandColor, buttonColor, elementBackgroundColor } from "../theme";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useForm } from "react-hook-form";

// multi language
import '../i18n';
import { useTranslation } from "react-i18next";

const spinnerStyle = {
  margin: "auto"
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
      #${elementBackgroundColor},
      #${brandColor}
    );
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 300;
  color: #${buttonColor};
  text-align: center;
  padding: 10px 0;
`;

const Form = styled.form`
  background-color: white;
  padding: 0px 60px;
  border-radius: 10px;
`;

const Agreement = styled.div`
  font-size: 12px;
  margin: 0px 0px 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  background-color: #${buttonColor};
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 30px;
  &:disabled{
    background-color: gray;
  }
`;

const FormSubmitSuccessful = styled.div`
  background-color: white;
  padding: 30px 60px;
  border-radius: 10px;
`;

const Register = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const { handleSubmit, formState } = useForm();
  const { isSubmitting, isSubmitSuccessful} = formState;

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "Matti",
      errorMessage: t('registerFirstNameError'),
      label: t('firstname'),
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "meikäläinen",
      errorMessage: t('registerLastNameError'),
      label: t('lastname'),
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: t('email'),
      errorMessage: t('registerMailError'),
      label: t('email'),
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: t('password'),
      errorMessage: t('registerPasswordError'),
      label: t('password'),
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: t('confirmPassword'),
      errorMessage: t('registerPasswordConfirmationError'),
      label: t('confirmPassword'),
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendToLogin = () => {
    setTimeout(() => {
      console.log("We take you to login page in 3 seconds...");
      history("/login");
    }, 3000);
  };

  const saveData = async (e) => {
    try {
      await axiosInstance.post("/auth/register",  values);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
         sendToLogin();
    }
  }, [isSubmitSuccessful]) 
  
  const TheForm = (
      <Form className="formInput" onSubmit={handleSubmit(saveData)}>
        <Title>{t('createAnAccount')}</Title>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button type="submit" disabled={isSubmitting} >
          {t('create').toUpperCase()}
        </Button>
        <Agreement>
          {t('privacyPolicyText')} <b>{t('privacyPolicy').toUpperCase()}</b>
        </Agreement>
      </Form>
  );

  return (
        <Container>
          {!isSubmitting && !isSubmitSuccessful && TheForm}
          {isSubmitting &&  <div><ClipLoader cssOverride={spinnerStyle}  size={100} /></div>}
          {isSubmitSuccessful && (
          <FormSubmitSuccessful>
             <Title>Tili on luotu! </Title>
             <h4>Sinut ohjataan kirjatumissivulle 3 sikunnissa...</h4>
          </FormSubmitSuccessful>
          )}
        </Container>
  );
};

export default Register;