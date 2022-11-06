import { CheckCircle } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components"
import { mobile } from "../../responsive"
import { useTranslation } from "react-i18next";
import axios from "axios";
import { emptyCart } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { hotjar } from 'react-hotjar';




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
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const checkoutStatus = searchParams.get("checkout-status")
  const orderId = searchParams.get("checkout-reference")
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL //process.env.REACT_APP_API_URL,
  });

  // call hotjar if user accepted preferences cookie
  if(getCookie("rcl_preferences_consent") === "true"){
    hotjar.initialize(3220042, 6)
    hotjar.identify('USER_ID', { userProperty: 'value' });
  }

  const getOrderData = async (orderId) => {
    try{
      const res = await axios.get(process.env.REACT_APP_API_URL+"/orders/getOrder/HDcSmyZpaWqR/find/"+orderId);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

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
          
        }else if(res.data.status === "ok"){
          console.log("order paid and email send")
          dispatch(emptyCart());
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
    getOrderData(orderId).then((response) => {
      window.location.href = process.env.REACT_APP_CLIENT_URL+"/receipt?orderId="+orderId+"_"+response.receiptHash;
    })
    
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
