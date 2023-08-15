import React from 'react'; // Make sure you have this imports
import { useEffect, useState } from 'react';
import '../../common/css/style.css';
import { useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import { smartPhone } from "../../responsive";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import CartProduct from './CartProduct';
import DeliveryTermsModal from "../DeliveryTermsModal"
import $ from 'jquery';

const CustomerDetails = styled.div`
  display: flex;
  margin-bottom: 5%;
  ${smartPhone({ flexDirection: "column" })}
`;
const BillingAddress = styled.div`
  flex: 1;
  padding: 0 10px 0 0;
  ${smartPhone({ marginBottom: "20px" })}
`;
const DeliveryAddress = styled.div`
  flex: 1;
  padding: 0 10px 0 0;
`;

const DetailsInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Key = styled.div`
  flex: 1;
  font-weight: 550;
`;
const Value = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const Hr = styled.hr`
  background-color: #b0b0b0;
  border: none;
  height: 1px;
`;

const TermsOfDelivery = styled.span`
 color: blue;
  margin-left: 4px;
  font-size: 18px !important;
`;

const H4 = styled.h4`
`;

const CommentContainer = styled.div`
  display: flex;
`;

const Comment = styled.div`
  flex: 1;
`;





const ReviewForm = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const [isLoading, setLoading] = useState(false);
  var orderId = null
  var transactionId = null
  const selectedLang = i18n.language
  const { register, handleSubmit, formState: { errors: handlePaymentErrors } } = useForm();
  const [modalShow, setModalShow] = useState(false);

  console.log(handlePaymentErrors)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleTermsOfDelivery = (event) => {
    event.stopPropagation();
    event.preventDefault();
    //goTo("/terms_of_delivery")
    setModalShow(true)
  }

  const BillingAddressComponent = (data) => (
    <>
      <DetailsInfo>
        <Key>{t("firstname")}</Key>
        <Value>{data.firstname}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("lastname")}</Key>
        <Value>{data.lastname}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("phonenumber")}</Key>
        <Value>{data.phonenumber}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("email")}</Key>
        <Value>{data.email}</Value>
      </DetailsInfo>
    </>
  );

  const DeliveryAddressComponent = (props) => {
    //console.log(props)
    return (
      <>
      {props.deliverySameAsBilling !== true && <DetailsInfo><Key>{t("firstname")}</Key><Value>{props.data.firstname}</Value></DetailsInfo>}
      {props.deliverySameAsBilling !== true && <DetailsInfo><Key>{t("lastname")}</Key><Value>{props.data.lastname}</Value></DetailsInfo>}
      <DetailsInfo>
        <Key>{t("streetAddress")}</Key>
        <Value>{props.data.streetAddress}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("postalCode")}</Key>
        <Value>{props.data.postalCode}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("city")}</Key>
        <Value>{props.data.city}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("country")}</Key>
        <Value>{props.data.country}</Value>
      </DetailsInfo>
      {props.deliverySameAsBilling !== true && <DetailsInfo><Key>{t("phonenumber")}</Key><Value>{props.data.phonenumber}</Value></DetailsInfo>}
      {props.deliverySameAsBilling !== true && <DetailsInfo><Key>{t("email")}</Key><Value>{props.data.email}</Value></DetailsInfo>}
    </>
    )
  };
  
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL //process.env.REACT_APP_API_URL,
  });


  //console.log(cart)

  const saveOrder= async () => {
    setLoading(true)

    // disable pay button
    $("#payButton").prop("disabled",true);


    try {
      await axiosInstance.post("/orders",  {cart: cart, language: selectedLang.toUpperCase()})
      .then((res) => {
        console.log(res)
        orderId = res.data._id
      });
    } catch(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  
  const getTransactionId = async () => {
    if(!orderId){
      console.log("Order id is not defined yet.")
      return 
    }
    try {
      await axiosInstance.get("/orders/find/transactionId/"+orderId)
      .then((res) => {
        console.log(res)
        transactionId = res.data
      });
    } catch(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }
  

 

  const HandlePayment = async (data) => {
    //console.log(data)
    await saveOrder()
    if(orderId){
      setTimeout(() => {
        getTransactionId()
        //console.log(orderId, transactionId)

        // redirect to paytrail page
        
        setTimeout(() => {
          
          if(transactionId && cart.promoPercentage !== 100){
            setLoading(false)

            // enable pay button
            $("#payButton").prop("disabled",false);

            const url = "https://pay.paytrail.com/pay/"+transactionId
            window.location.href=url;
          }else if(cart.promoPercentage === 100){
            window.location.href="/cart/success?checkout-reference="+orderId+"&checkout-transaction-id="+transactionId+"&checkout-status=ok";
          }else{
            console.log("Data is saving...")
          }
        }, 3000); // 3000
      }, 2000); // 2000
    }
  }
  
  const spinnerStyle = {
    margin: "auto"
  };

  //console.log(cart)
  
  return (
    <div className='container'>

      <CustomerDetails>
        <BillingAddress>
          <H4>{t("ordererInfo")}</H4>
          <BillingAddressComponent {...cart.billingAddress} />
        </BillingAddress>


        <DeliveryAddress>
          <H4>{t("deliveryAddress")}</H4>
          <DeliveryAddressComponent data={cart.deliverySameAsBilling ? cart.billingAddress : cart.deliveryAddress} deliverySameAsBilling={cart.deliverySameAsBilling} />
        </DeliveryAddress>

      </CustomerDetails>

      <CommentContainer>
        <Comment>
          <DetailsInfo>
            {cart.message && <Key>{t("order_extra_info")}</Key>}
            {cart.message && <Value>{cart.message}</Value>}
          </DetailsInfo>
        </Comment>
      </CommentContainer>
      <Hr/>

    
      <CartProduct page="review"/>
      
      <Hr/>

     
      <form id="handlePaymentForm" name="handlePaymentForm" onSubmit={handleSubmit(HandlePayment)}>
        <div className="inputwrapper">
          <input type="checkbox" className="checkbox-input checkbox-larger" id="termsOfDelivery" name="termsOfDelivery" 
          {...register("termsOfDelivery",{ 
            required: true,
          })}
          />
          <div>
            <label htmlFor="termsOfDelivery" className="checkbox-label checkbox-label-larger">
              {t("haveAlreadyRead")} 
              <TermsOfDelivery target="_blank" onClick={handleTermsOfDelivery}>{t("deliveryterms")}. *</TermsOfDelivery>
            </label>
          </div>
          
          <span id="customerInformation_termsOfDelivery" className='input-info invalid' role="alert">
            {handlePaymentErrors.termsOfDelivery && handlePaymentErrors.termsOfDelivery?.type === "required" && (
              t("youHaveToConfirm")
            )}
          </span>
        </div>
      </form>
      {isLoading &&  <div><ClipLoader cssOverride={spinnerStyle}  size={40} /></div>}
      <DeliveryTermsModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default ReviewForm;
