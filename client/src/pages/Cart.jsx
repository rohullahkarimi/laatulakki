import {  Preview, RemoveShoppingCart } from "@mui/icons-material";
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
import ConfirmationCart from '../components/cart/ConfirmationCart';
import CartProduct from '../components/cart/CartProduct';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container, Row, Col
} from 'react-bootstrap';


const steps = [
  { id: 'cart_product', nextButtonName: "JATKA", backButtonName: "JATKA OSTOSTA", Component: CartProduct },
  { id: 'cart_customer_information', nextButtonName: "JATKA ", backButtonName: "EDELLINEN", Component: CustomerInformationForm },
  { id: 'cart_review', nextButtonName: "JATKA", backButtonName: "EDELLINEN", Component: ReviewCart },
  { id: 'cart_confirmation', nextButtonName: "MAKSA", backButtonName: "EDELLINEN", Component: ConfirmationCart },
];



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
  padding: 20px;
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

const TopButtonRemove = styled.button`
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "#ffe6e2"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  cursor: pointer;
  /*margin: 0px 10px;*/
  color: #000;
  font-size: 16px;
  display: inline;
  vertical-align: middle;
  ${smartPhone({ display: "none" })}
  
`;

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
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(cart.quantity);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { Component } = step;
  console.log(step.id)

  
  const handleEmptyCart = (() => {
    console.log("iam here")
    setCartItems(cartItems - 1);
    dispatch(emptyCart());
    cartItems === 0 && navigate("/") 
    console.log(cartItems)
  });



  const CartBackPageNavigator =  () => {
    console.log(step.id)
    if(step.id === 'cart_product'){
      navigate('/')
    }else if(step.id === 'cart_customer_information'){
      navigation.prev()
    }else if(step.id === 'cart_review'){
      navigation.prev()
    }else if(step.id === 'cart_confirmation'){
      navigation.prev()
    }else{
      console.log("Error in previous navigation")
    }
  }

  const CartNextPageNavigator =  () => {
    console.log(step.id)
    if(step.id === 'cart_product'){
      navigation.next()
    }else if(step.id === 'cart_customer_information'){
      validateForm()
    }else if(step.id === 'cart_review'){
      navigation.next()
    }else if(step.id === 'cart_confirmation'){
      alert("pay time")
    }else{
      console.log("Error in navigation")
    }
  }

  
  function validateForm() {
    // billing address
    var b_firstname = cart.billingAddress.firstname; 
    var b_lastname = cart.billingAddress.lastname; 

    // delivery address
    var d_firstname = cart.deliveryAddress.firstname; 
    var d_lastname = cart.deliveryAddress.lastname; 
    if (!b_firstname || !b_lastname || !d_firstname || !d_lastname) {
      alert("Ole hyvä, täyttää kaikki lomakkeen tiedot ja muista tallenna.");
      return false;
    }
    navigation.next()
  }



  
  return (
    <div>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>Ostoskori</Title>
          <Ul className="bc">
            <Li className={step.id === "cart_product" ? "bc_item bc_complete" : "bc_item"}>Cart</Li>
            <Li className={step.id === "cart_customer_information" ? " bc_item bc_complete" : "bc_item"}>Customer Information</Li>
            <Li className={step.id === "cart_review" ? "bc_item bc_complete" : "bc_item"}>Review</Li>
            <Li className={step.id === "cart_confirmation" ? "bc_item bc_complete" : "bc_item"}>Payment Method</Li>
          </Ul>
          <Bottom>
            <Info>
                <div className="app w3-card-4">
                  
                    <Component />
                  

                  <footer className="w3-container w3-blue" />
                </div>
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY1</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
            </Summary>
          </Bottom>
          <Top>
           
            <TopButton onClick={CartBackPageNavigator}> {step.backButtonName}</TopButton>
            <TopButtonRemove  onClick={(handleEmptyCart)}><RemoveShoppingCart style={{verticalAlign:"middle", height: "20px", "width": "20px"}}/> <TopText>EMPTY CART</TopText></TopButtonRemove>
            <TopButton onClick={CartNextPageNavigator} type="filled"> {step.nextButtonName}</TopButton>

         
          </Top>
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;