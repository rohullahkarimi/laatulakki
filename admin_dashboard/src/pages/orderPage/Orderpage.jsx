import React from 'react';
import styled from "styled-components"
import { mobile, smartPhone, tablet } from "../../responsive";
import {Print } from "@material-ui/icons";


import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";


const PrintContainer = styled.div`
  @media print {
    display: none;
  }
`;

const ContainerDiv = styled.div`
    flex: 4;
  padding: 20px;
  @media print {
    padding: 0;
  }
`
const Title = styled.h2`
    text-align: center;
    margin-bottom: 2%;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${tablet({ flexDirection: "column", alignItems: "center" })}
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
  @media print {
    margin-bottom: 0;
  }
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
  @media print {
    display: none;
  }
`;

const CustomizedOptionsDiv = styled.span`
  display: block;
  color: #000;
  font-size: 14px;
  @media print {
    font-size: 14px;
  }
`;


const H4 = styled.h4`
`;

const CommentContainer = styled.div`
  width: 80%;
  display: flex;
  padding: 0 10px 0 0;
`;

const Comment = styled.div`
  flex: 1;
`;





const Receipt = () => {
  const location = useLocation()
  const [orderData, setOrderData] = useState({})
  const orderId = location.pathname.split("/")[2];



  useEffect(() =>{
    const getOrder = async ()=> {
      try{
          const res = await userRequest.get("/orders/getOrder/HDcSmyZpaWqR/find/" + orderId);
          setOrderData(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getOrder()
  }, [orderId, orderData.receiptHash]);

  //console.log(orderId)
    console.log(orderData)

  
  // make a new copy of product object, to sum the price in total
  var products_in_total = 0;
  const productsArray = orderData.products?.map(item => {
    
    // if product has discount
    var unitPrice;
    if(item.discount){
        var afterDiscountPrice = item.price - (item.price * (item.discount / 100)).toFixed(2);
        unitPrice = afterDiscountPrice;
    }else{
        unitPrice = item.price;
    }

    
    var productPriceTax = (unitPrice / 1.24).toFixed(2);
    var productPriceTaxLess = (unitPrice - productPriceTax).toFixed(2);

    // products in total
    products_in_total += unitPrice * item.quantity;


    const productObject = {
      ...item, 
      priceInTotal : (unitPrice * item.quantity).toFixed(2),
      tax: productPriceTax,
      taxLess: productPriceTaxLess
    };
    return productObject;
  })


  // delivery 
  var delivery_taxLess = (orderData.deliveryPrice / 1.24).toFixed(2);
  var delivery_tax = (orderData.deliveryPrice - delivery_taxLess).toFixed(2);

  // total price
  var totalPriceIncludeDelivery = orderData.total?.toFixed(2);
  var totalPriceIncludeDelivery_taxLess = (totalPriceIncludeDelivery / 1.24).toFixed(2);
  var totalPriceIncludeDelivery_tax = (totalPriceIncludeDelivery - totalPriceIncludeDelivery_taxLess).toFixed(2);



  var products_in_total_taxLess =  (products_in_total / 1.24).toFixed(2);
  var products_in_total_tax = (products_in_total - products_in_total_taxLess).toFixed(2);

  
  
  // data for email
  const order = {
    billingAddress: orderData.billingAddress,
    deliveryAddress: orderData.deliverySameAsBilling ? orderData.billingAddress : orderData.deliveryAddress,
    message: orderData.message,
    products: productsArray,
    

    products_in_total: products_in_total.toFixed(2),
    products_in_total_taxLess: products_in_total_taxLess,
    products_in_total_tax: products_in_total_tax,
    

    delivery_tax: delivery_tax,
    delivery_taxLess: delivery_taxLess,
    deliveryPrice: orderData?.deliveryPrice?.toFixed(2),

    totalPriceIncludeDelivery_taxLess: totalPriceIncludeDelivery_taxLess,
    totalPriceIncludeDelivery_tax: totalPriceIncludeDelivery_tax,
    totalPriceIncludeDelivery: totalPriceIncludeDelivery
  }

  

  const navigateToReceipt = () =>{
    console.log(process.env.REACT_APP_CLIENT_URL)
    window.location.href = process.env.REACT_APP_CLIENT_URL+"/receipt?orderId="+orderData._id+"_"+orderData.receiptHash;
  }

  const Address = (data) => (
    <>
        <DetailsInfo>
        <Key>Firstname</Key>
        <Value>{data.firstname}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Lastname</Key>
        <Value>{data.lastname}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Streetaddress</Key>
        <Value>{data.streetAddress}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Postalcode</Key>
        <Value>{data.postalCode}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>City</Key>
        <Value>{data.city}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Country</Key>
        <Value>{data.country}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Phone number</Key>
        <Value>{data.phonenumber}</Value>
        </DetailsInfo>
        <DetailsInfo>
        <Key>Email</Key>
        <Value>{data.email}</Value>
        </DetailsInfo>
    </>
    );
  

  
    return (
      <ContainerDiv>
        <PrintContainer></PrintContainer>
        <div id="starter" style={{padding: "2% 0px 5% 0"}}>
            <Title>Order page 
                <PrintContainer>
                    <Print style={{float: "right"}} fontSize="large" onClick={navigateToReceipt}/>
                </PrintContainer>
            </Title>

            <CustomerDetails>
                <BillingAddress>
                <H4>Customer info</H4>
                <Address {...order?.billingAddress} />
                </BillingAddress>


                <DeliveryAddress>
                <H4>Delivery info</H4>
                <Address {...(order.deliverySameAsBilling ? order.billingAddress : order.deliveryAddress)} />
                </DeliveryAddress>

            </CustomerDetails>

            <CommentContainer>
                <Comment>
                <DetailsInfo>
                    {order.message && <Key>Comment: </Key>}
                    {order.message && <Value>{order.message}</Value>}
                </DetailsInfo>
                </Comment>
            </CommentContainer>
            <Hr/>

            <div>
                {order.products?.map((product) => (
                <Product key={product._id+product.size}>
                    <ImageContainer><Image src={product.img} /></ImageContainer>
                    <ProductDetail>
                        <Details>
                        <ProductName>
                            <b>Name:</b> {product.title?.replace("<br>"," / ")}
                        </ProductName>
                        <ProductId>
                            <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor><b>Color:</b> {product.color}</ProductColor>
                        <ProductSize>
                            <b>Size:</b> {product.size}
                        </ProductSize>
                        <ProductQuantity>
                            <b>Kpl:</b> {product.quantity}
                        </ProductQuantity>

                        <ProductPriceText>
                            <b>Vat:</b> {product.vatPercentage} €
                        </ProductPriceText>
                        <ProductPriceText>
                            <b>Tax:</b> {product.tax} €
                        </ProductPriceText>
                        <ProductPriceText>
                            <b>Tax less:</b> {product.taxLess} €
                        </ProductPriceText>

                        <ProductPriceText>
                            <b>Price per piece:</b> {product.discount ? product.price - (product?.price * (product.discount / 100)).toFixed(2) : product.price.toFixed(2) } €   
                        </ProductPriceText>
                        </Details>
                    </ProductDetail>


                    {product.customizedProduct ? (
                      <>
                        <ProductDetail>
                            <Details>
                              <CustomizedOptionsDiv>
                                <b>Lyyra:</b> {product?.customizationOptions.badge} ({product?.customizationPrices.badge}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Koristenauha:</b> {product?.customizationOptions.roundRibbonColor} ({product?.customizationPrices.roundRibbonColor}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Lippanauha:</b> {product?.customizationOptions.cordColor}  ({product?.customizationPrices.cordColor}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Etukirjailu (vasen - oikein):</b> {product?.customizationOptions.embroidery?.embroideryTextFront?.left} -- {product?.customizationOptions.embroidery?.embroideryTextFront?.right}   ({product?.customizationPrices.embroideryTextFront}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Takakirjailu:</b> {product?.customizationOptions.embroidery?.embroideryTextBack} ({product?.customizationPrices.embroideryTextBack}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Brodeeraus väri:</b> {product?.customizationOptions.embroidery?.embroideryTextColor}
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>Brodeeraus fontti:</b> {product?.customizationOptions.embroidery?.embroideryFont}
                              </CustomizedOptionsDiv>
                            </Details>
                        </ProductDetail>
                      </>
                    ) :  <ProductDetail/>}


                    <PriceDetail>
                        <ProductPrice>
                          {product.discount ? (product.price - (product?.price * (product.discount / 100)).toFixed(2)) * product.quantity :  (product.price * product.quantity).toFixed(2)} €
                        </ProductPrice>
                    </PriceDetail>
                </Product>
                ))}
            </div>
            <hr/>

            <CustomerDetails>
                <BillingAddress>
                    <DetailsInfo>
                      <Key> - </Key> <Key>Tax less</Key>  <Key>Vat</Key> <Key>%</Key> <Key>Total</Key>
                    </DetailsInfo>

                    <DetailsInfo>
                      <Key>Products in total</Key>
                      <Value>{order.products_in_total_taxLess} € </Value>
                      <Value>{order.products_in_total_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.products_in_total} € </Value>
                    </DetailsInfo>

                    { orderData.promoPercentage > 0 &&
                      <DetailsInfo>
                        <Key>Discount ({orderData.promoPercentage}% - {orderData.promoCode})</Key>
                        <Value> - </Value>
                        <Value> - </Value>
                        <Value> - </Value>
                        <Value>-{orderData?.discountAmount?.toFixed(2)} €</Value>
                      </DetailsInfo>
                    }

                    <DetailsInfo>
                      <Key>Delivery</Key>
                      <Value>{order.delivery_taxLess} € </Value>
                      <Value>{order.delivery_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.deliveryPrice} € </Value>
                    </DetailsInfo>

                    <DetailsInfo>
                      <Key>Total</Key>
                      <Value>{order.totalPriceIncludeDelivery_taxLess} € </Value>
                      <Value>{order.totalPriceIncludeDelivery_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.totalPriceIncludeDelivery} € </Value>
                    </DetailsInfo>
                </BillingAddress>
            </CustomerDetails>
    
        </div>
      </ContainerDiv>
    )
  
}

export default Receipt