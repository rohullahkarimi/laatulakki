import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
// multi language
import '../i18n';
import { useTranslation } from "react-i18next";

// theme
import { brandColor, buttonColor, elementBackgroundColor } from '../theme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      #${elementBackgroundColor},
      #${brandColor}
    );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 300;
  color: #${buttonColor};
  text-align: center;
  padding: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid gray;
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
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };


  

 
  return (
    <Container>
      <Wrapper>
        <Title>{t('login')}</Title>
        <Form>
          <Input
            placeholder={t('email')}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder={t('password')}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button onClick={handleClick} disabled={isFetching}>
          {t('login')}
          </Button>
          {error && <Error>{t('somethingWentWrong')}</Error>}
          <Link>{t('forgotPassText')}</Link>
          <Link to="./register">{t('createAccountText')}</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;