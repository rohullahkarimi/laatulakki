import {  RemoveShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../css/Cart.css"
import { mobile, smartPhone, tablet } from "../responsive";
import {  emptyCart } from '../redux/cartRedux';
import { useStep } from '@flywire/react-hooks';
import CustomerInformationForm from '../components/cart/CustomerInformationForm';
import ReviewCart from '../components/cart/ReviewCart';
import DeliveryMethod from '../components/cart/DeliveryMethod';
import CartProduct from '../components/cart/CartProduct';
import { useNavigate } from "react-router-dom";
import { hotjar } from 'react-hotjar';
import {getCookie} from "../common/js/common.js";
import { useState } from "react";

//import $ from 'jquery';
import {
  Container
} from 'react-bootstrap';
import { useTranslation } from "react-i18next";






//const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const TopButtonNext = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: black;
  color: white;
`;
/*
const TopText = styled.span`
  cursor: pointer;
  color: #000;
  font-size: 16px;
  display: inline;
  vertical-align: middle;
  ${smartPhone({ display: "none" })}
`;
*/

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column"})}
  ${smartPhone({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  ${tablet({ marginTop: "15px"})}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const SummaryItemPrice = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const Ul = styled.ul`
`
const Li = styled.li`
`


const Cart = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(cart.quantity);
  const steps = [
    { id: 'cart_product', nextButtonName: t("continue"), backButtonName: t("continue_shopping"), Component: CartProduct },
    { id: 'cart_customer_information', nextButtonName: t("continue"), backButtonName: t("pervious"), Component: CustomerInformationForm },
    { id: 'deliveryMethod', nextButtonName: t("continue"), backButtonName: t("pervious"), Component: DeliveryMethod },
    { id: 'cart_review', nextButtonName: t("pay"), backButtonName: t("pervious"), Component: ReviewCart },
  ];
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { Component } = step;

  // call hotjar if user accepted preferences cookie
  if(getCookie("rcl_preferences_consent") === "true"){
    hotjar.initialize(3220042, 6)
    hotjar.identify('USER_ID', { userProperty: 'value' });
  }
 
  


  const props = { navigation };

  const handleEmptyCart = (() => {
    setCartItems(cartItems - 1);
    dispatch(emptyCart());
    cartItems === 0 && navigate("/") 
  });



  const CartBackPageNavigator =  () => {
    //console.log(step.id)
    if(step.id === 'cart_product'){
      navigate('/')
    }else if(step.id === 'cart_customer_information'){
      navigation.prev()
    }else if(step.id === 'deliveryMethod'){
      navigation.prev()
    }else if(step.id === 'cart_review'){
      navigation.prev()
    }else{
      console.log("Error in previous navigation")
    }
  }

  const CartNextPageNavigator =  () => {
    //console.log(step.id)
    if(step.id === 'cart_product'){
      navigation.next()
    }else if(step.id === 'cart_review'){
      alert("pay time")
    }else{
      console.log("Error in navigation")
    }
  }

  
 

 
    let nextButton;
    if(step.id === "cart_customer_information"){
      nextButton = <TopButtonNext form="customerInformation" type="submit"> {step.nextButtonName}</TopButtonNext>
    }else if(step.id === "deliveryMethod"){
      nextButton = <TopButtonNext form="paymentMethodForm" type="submit"> {step.nextButtonName}</TopButtonNext>
    }else if(step.id === "cart_review"){
      nextButton = <TopButtonNext form="handlePaymentForm" type="submit"> {step.nextButtonName}</TopButtonNext>
    }else{
      nextButton =  <TopButton type="filled" onClick={CartNextPageNavigator}> {step.nextButtonName}</TopButton>
    }


    const deliveryPrice = cart.deliveryPrice
    var cartSubtotal = cart.total
    var cartTotal = cart.total
    if(cart.deliveryPrice > 0){
      cartTotal += cart.deliveryPrice
      
    }

    console.log(cart)
    return (
      <div>
        <Navbar />
        <Announcement />
        <Container>
          <Wrapper>
            <Title>{t("cart")} <RemoveShoppingCart onClick={(handleEmptyCart)} style={{verticalAlign:"middle", height: "20px", "width": "20px"}}/></Title>
            <Ul className="bc">
              <Li className={step.id === "cart_product" ? "bc_item bc_complete" : "bc_item"}>{t("products")}</Li>
              <Li className={step.id === "cart_customer_information" ? " bc_item bc_complete" : "bc_item"}>{t("own_information")}</Li>
              <Li className={step.id === "deliveryMethod" ? "bc_item bc_complete" : "bc_item"}>{t("deliveryMethod")}</Li>
              <Li className={step.id === "cart_review" ? "bc_item bc_complete" : "bc_item"}>{t("summary")}</Li>
            </Ul>
            <Bottom>
              <Info>
                  <div className="app w3-card-4">
                    <Component {...props} />
                    <footer className="w3-container w3-blue" />
                  </div>
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>{t("summary")}</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>{t("subtotal")}</SummaryItemText>
                  <SummaryItemPrice>{cartSubtotal.toFixed(2)} €</SummaryItemPrice>
                </SummaryItem>
                
                {cart.deliveryPrice !== 0 && <SummaryItem><SummaryItemText>Toimitusmaksu</SummaryItemText><SummaryItemPrice>{deliveryPrice?.toFixed(2)} €</SummaryItemPrice></SummaryItem>}
                  
                <SummaryItem type="total">
                  <SummaryItemText>{t("total")}</SummaryItemText>
                  <SummaryItemPrice> {cartTotal.toFixed(2)} €</SummaryItemPrice>
                </SummaryItem>
              </Summary>
            </Bottom>
            <Top>
            
              <TopButton onClick={CartBackPageNavigator}> {step.backButtonName}</TopButton>
              {nextButton}
            </Top>
          </Wrapper>
        </Container>
        <Footer />
      </div>
    );
  
};

export default Cart;