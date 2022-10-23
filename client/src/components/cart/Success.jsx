import { CheckCircle } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components"
import { mobile } from "../../responsive"
import emailjs from '@emailjs/browser';
import {  emptyCart } from '../../redux/cartRedux';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";




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
  const orderId = searchParams.get("checkout-reference")
  const dispatch = useDispatch()
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL //process.env.REACT_APP_API_URL,
  });

  const sendMail = async (orderId) => {
    if(!orderId){
      alert("Order id is not defined yet.")
      return 
    }
    try {
      await axiosInstance.get("/sendMail/"+orderId)
      .then((res) => {
        if(res.data.status !== "ok"){
          // redirect user to cancel page
          
        }else if(res.data.status !== "ok"){
          console.log("order paid and email send")
        }
      });
    } catch(error) {
      console.log('Error', error.message);
    }
  }

  if(checkoutStatus === "ok"){
    // call to send mail function 
    sendMail(orderId)
  }
  
  const navigateToReceipt = () =>{
    window.location.href= "https://tester.laatulakki.fi/receipt?orderId="+orderId;
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
      <Button onClick={navigateToReceipt} type="filled">{t("receipt")}</Button>
    </InfoContainer>
  );
};

export default Success;
