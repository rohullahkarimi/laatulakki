import { CheckCircle } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components"
import { mobile } from "../../responsive"
import emailjs from '@emailjs/browser';
import {  emptyCart } from '../../redux/cartRedux';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";




const InfoContainer = styled.div`
    text-align: center;
    padding: 0px 50px;
    margin: 10% 0;
    ${mobile({padding: "10px"})}
`

const Title = styled.h2`
    text-align: center;
    margin-bottom: 4%;
`


const IconHolder = styled.div`
    text-align: center;
`

const Desc = styled.p`
    margin: 20px 0px;
`


const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  width: 120px;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Success = () => {
  const cart = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const checkoutStatus = searchParams.get("checkout-status")
  const dispatch = useDispatch()

  if(checkoutStatus === "ok"){
    // send user an email
    console.log("ok")
      //console.log(data);
      const data = {
        from_name: "LaatuLakki",
        to_email: cart.billingAddress.email
      }
      if(cart.billingAddress.email){
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, "template_23z3qgm", data, process.env.REACT_APP_EMAILJS_API_KEY)
        .then((result) => {
            console.log(result.text);
            dispatch(emptyCart());
        }, (error) => {
            console.log(error.text);
        });
      }else{
        console.log("there is not email in cart")
      }
    // change order paid to true
    console.log("paid false")

  }
 
  return (
    <InfoContainer>
      <IconHolder>
          <CheckCircle     
              size="50px"
              sx={{color: "green", fontSize: "60px"}}
          />
      </IconHolder>
      
      <Title>{t("thanksForYourOrder")}</Title>
      <Desc>{t("youCanDownloadReceipt")}</Desc>
      <Button onClick={()=> alert("Tämä ominaisuus on tulossa...")} type="filled">{t("receipt")}</Button>
    </InfoContainer>
  );
};

export default Success;
