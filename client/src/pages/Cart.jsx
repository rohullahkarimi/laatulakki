import { Add, DeleteOutline, Remove, RemoveShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, smartPhone, tablet } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState, useCallback } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { increaseProduct, decreaseProduct, deleteProduct, emptyCart, addUserData } from '../redux/cartRedux';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { Send } from "@mui/icons-material"


const Container = styled.div``;

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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${tablet({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const ProductId = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const ProductColor = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
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

const ProductPriceText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;


const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RemoveProduct = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RemoveProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
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




const Desc = styled.div`
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 20px;
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
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
    width: auto;
`

const TextAreaContainer = styled.div`
    width: 80%;
    height: 100px;
    display: flex;
    flex-direction: column;
    ${mobile({width: "80%"})}
`

const TextArea = styled.textarea`
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
`




const Cart = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const KEY = process.env.REACT_APP_STRIPE;
  const dispatch = useDispatch()

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart, 
        }); 
      } catch {}
    };
    stripeToken && makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken, cart.total, navigate]);

  console.log(cart)

  const handleDelete = useCallback((product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    console.log(product);
  }, [dispatch]);

  const handleQuantityIncrease = useCallback((product) => {
    dispatch(
      increaseProduct({
        id: product._id,
        price: product.price,
      })
    );
    console.log(product);
  }, [dispatch]);

  const handleQuantityDecrease = useCallback((product) => {
    dispatch(
      decreaseProduct({
        id: product._id,
        price: product.price,
      })
    );
    console.log(product);
  }, [dispatch]);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((userData) => {
    console.log(userData)
    dispatch(
      addUserData(userData)
    )
  },[dispatch]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Ostoskori</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>JATKA OSTOKSIA</TopButton>
          <TopButtonRemove  onClick={() => dispatch(emptyCart())}><RemoveShoppingCart style={{verticalAlign:"middle", height: "20px", "width": "20px"}}/> <TopText>EMPTY CART</TopText></TopButtonRemove>
          <TopButton type="filled"> SIIRRY MAKSAMAAN</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title.replace("<br>"," / ")}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor><b>Color:</b> {product.color}</ProductColor>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                    <ProductPriceText>
                      <b>Price:</b> {product.price}
                    </ProductPriceText>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={()=>handleQuantityIncrease(product)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>handleQuantityDecrease(product)}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <RemoveProduct>
                  <RemoveProductContainer><DeleteOutline onClick={() => handleDelete(product)} style={{color: "tomato"}}/></RemoveProductContainer>
                </RemoveProduct>
              </Product>
              
              
            ))}
            <Hr />

            <UserInfo>
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <Title>Tilaajan tiedot</Title>
                  <Desc>joku info</Desc>
                  <InputContainer>
                      <Input type="text" value={cart.userData[0]?.firstname} placeholder={t('firstname')+" *" } {...register('firstname', { required: { value: true, message: "firstname is empty"}  })}  />
                      <span className="formErrors">{errors.firstname?.message}</span>
                  </InputContainer>
                  <InputContainer>
                      <Input type="text" value={cart.userData[0]?.lastname} placeholder={t('lastname')+" *" } {...register('lastname', { required: { value: true, message: "lastname is empty"} })}   />
                      <span className="formErrors">{errors.lastname?.message}</span>
                  </InputContainer>
                  <InputContainer>
                      <Input  className="formInput" type="email" placeholder={t('feedback_email')+" *" } {
                          ...register("user_email", { 
                          required: t('emailRequired') + "*", 
                          pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: t('enterEmail'),
                          },
                      })} value={cart.userData[0]?.user_email}  />
                      <span className="formErrors">{errors.user_email?.message}</span>
                  </InputContainer>
                  <TextAreaContainer>
                      <TextArea type="text" value={cart.userData[0]?.user_message}  placeholder="more info about the order *" {...register('user_message', { required: false })}/>
                      <span className="formErrors">{errors.user_message?.message}</span>
                  </TextAreaContainer>

                  <InputContainer>
                      <Button type="submit" >
                          {t("send_button")} 
                          <Send style={{marginLeft: "5px"}}/>
                      </Button>
                  </InputContainer>
              </Form>
            </UserInfo>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;