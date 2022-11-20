import { useEffect, useState } from 'react';
import '../../common/css/style.css';
import { useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import { mobile, smartPhone, tablet } from "../../responsive";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


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

const ProductQuantity = styled.span`
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



const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;


const ProductPriceText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

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
  display: inline-block;
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
  const goTo = useNavigate()
  var orderId = null
  var transactionId = null
  const selectedLang = i18n.language
  const { register, handleSubmit, formState: { errors: handlePaymentErrors } } = useForm();

  console.log(handlePaymentErrors)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleTermsOfDelivery = () => {
    goTo("/terms_of_delivery")
  }


  const Address = (data) => (
  
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
        <Key>{t("streetAddress")}</Key>
        <Value>{data.streetAddress}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("postalCode")}</Key>
        <Value>{data.postalCode}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("city")}</Key>
        <Value>{data.city}</Value>
      </DetailsInfo>
      <DetailsInfo>
        <Key>{t("country")}</Key>
        <Value>{data.country}</Value>
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
  
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL //process.env.REACT_APP_API_URL,
  });


  console.log(cart)

  const saveOrder= async () => {
    setLoading(true)
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
    console.log(data)
    await saveOrder()
    if(orderId){
      setTimeout(() => {
        getTransactionId()
        console.log(orderId, transactionId)

        // redirect to paytrail page
        
        setTimeout(() => {
          if(transactionId){
            setLoading(false)
            const url = "https://pay.paytrail.com/pay/"+transactionId
            window.location.href=url;
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

 
  
  return (
    <div className='container'>

      <CustomerDetails>
        <BillingAddress>
          <H4>{t("ordererInfo")}</H4>
          <Address {...cart.billingAddress} />
        </BillingAddress>


        <DeliveryAddress>
          <H4>{t("receiverInfo")}</H4>
          <Address {...(cart.deliverySameAsBilling ? cart.billingAddress : cart.deliveryAddress)} />
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

      <div >
        {cart.products.map((product) => (
        <Product key={product._id}>
          <ProductDetail>
            <Image src={product.img} />
            <Details>
              <ProductName>
                <b>{t("product")}:</b> {product.title?.replace("<br>"," / ")}
              </ProductName>
              <ProductId>
                <b>ID:</b> {product._id}
              </ProductId>
              <ProductColor><b>{t("color")}:</b> {product.color}</ProductColor>
              <ProductSize>
                <b>{t("size")}:</b> {product.size}
              </ProductSize>
              <ProductQuantity>
                <b>Kpl:</b> {product.quantity}
              </ProductQuantity>
              <ProductPriceText>
                <b>{t("pricePerPiece")}:</b> {product.price.toFixed(2)} €
              </ProductPriceText>
            </Details>
          </ProductDetail>
          <PriceDetail>
            <ProductPrice>
              {(product.price * product.quantity).toFixed(2)} €
            </ProductPrice>
          </PriceDetail>
        </Product>
        ))}
      </div>

      
      <Hr/>

     
      <form id="handlePaymentForm" name="handlePaymentForm" onSubmit={handleSubmit(HandlePayment)}>
        <div className="inputwrapper">
          <input type="checkbox" className="checkbox-input checkbox-larger" id="termsOfDelivery" name="termsOfDelivery" 
          {...register("termsOfDelivery",{ 
            required: true,
          })}
          />
          <label htmlFor="termsOfDelivery" className="checkbox-label checkbox-label-larger">
          {t("haveAlreadyRead")} <TermsOfDelivery target="_blank" onClick={handleTermsOfDelivery}>{t("deliveryterms")}</TermsOfDelivery>. * 
          </label>
          <span id="customerInformation_termsOfDelivery" className='input-info invalid' role="alert">
            {handlePaymentErrors.termsOfDelivery && handlePaymentErrors.termsOfDelivery?.type === "required" && (
              t("youHaveToConfirm")
            )}
          </span>
        </div>
      </form>
      {isLoading &&  <div><ClipLoader cssOverride={spinnerStyle}  size={40} /></div>}

    </div>
  );
};

export default ReviewForm;
