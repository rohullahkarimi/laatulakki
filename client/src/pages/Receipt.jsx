import React from 'react'; // Make sure you have this import
import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { mobile, smartPhone, tablet } from "../responsive";
import PrintIcon from '@mui/icons-material/Print';
import {
    Container
  } from 'react-bootstrap';
import Navbar from "../components/Navbar";
//import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods"
import {Helmet} from "react-helmet";


const HeaderContainer = styled.div`
  display: flex;
  margin: 2% 0;
`

const Title = styled.h2`
    flex: 1;
    text-align: center;
`


const PrintContainer = styled.div`
  flex: 1;
  @media print {
    display: none;
  }
`;


const CompanyContainer = styled.div`  
  flex:1;
`;



const ContainerDiv = styled.div`
  @media print {
    padding: 0;
    font-size: 14px;
  }
`


const Product = styled.div`

  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  @media print {
    font-size: 14px;
  }
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
  ${tablet({ flexDirection: "column", alignItems: "flex-start" })}
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
  font-size: 14px;
  @media print {
    font-size: 14px;
  }
`;

/*
const ProductId = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;
*/

const ProductColor = styled.span`
  display: block;
  color: #000;
  font-size: 14px;
  background-color: ${(props) => props.color};
  @media print {
    font-size: 14px;
  }
`;

const ProductSize = styled.span`
  display: block;
  color: #000;
  font-size: 14px;
  @media print {
    font-size: 14px;
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





const ProductQuantity = styled.span`
  display: block;
  color: #000;
  font-size: 14px;
  @media print {
    font-size: 14px;
  }
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
  @media print {
    font-size: 14px;
  }
`;


const ProductPriceText = styled.span`
  display: block;
  color: #000;
  font-size: 14px;
  @media print {
    font-size: 14px;
  }
`;

const CustomerDetails = styled.div`
  display: flex;
  margin-bottom: 2%;
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

const CommentDetails = styled.div`
  font-weight: 550;
  display: inherit;
`;

const CommentValueDetail = styled.div`
  font-weight: normal;
  margin-left: 5px;
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


const H4 = styled.h5`
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Comment = styled.div`
  flex: 1;
`;


const Receipt = () => {
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState({})
  const [receiptValid, setReceiptValid] = useState(false);
  //const [searchParams, setSearchParams] = useSearchParams();
  const queryParameters = new URLSearchParams(window.location.search)
  const orderIdDetails = queryParameters.get("orderId");
  const order_array = orderIdDetails.split('_');

  var receiptHash =  order_array[1];
  var orderId = order_array[0];


  useEffect(() =>{
    const getOrder = async ()=> {
      try{
          const res = await publicRequest.get(`/orders/getOrder/HDcSmyZpaWqR2023/find/${orderId}`, {
            params: {
                receiptHash: receiptHash
            }
          });

          setOrderData(res.data);

          if (orderData.receiptHash === receiptHash){
            setReceiptValid(true)
          }else{
            setReceiptValid(false)
          }
      }catch(err){
        console.log(err)
      }
    }
    getOrder()
  }, [orderId, orderData.receiptHash, receiptHash]);

  //console.log(orderId)
  //console.log(orderData)

  
  // make a new copy of product object, to sum the price in total
  var products_in_total = 0;
  const productsArray = orderData.products?.map(item => {
    
    // if product has discount
    var unitPrice;
    if(item.discount){
        var afterDiscountPrice = (item.price - (item.price * (item.discount / 100)).toFixed(2)).toFixed(2);
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
      taxLess: productPriceTax,
      tax: productPriceTaxLess
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

    promoPercentage: orderData?.promoPercentage,
    promoAmount: orderData?.discountAmount,

    totalPriceIncludeDelivery_taxLess: totalPriceIncludeDelivery_taxLess,
    totalPriceIncludeDelivery_tax: totalPriceIncludeDelivery_tax,
    totalPriceIncludeDelivery: totalPriceIncludeDelivery
  }

  console.log(order.products)

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
  

  //console.log(order)
  if(receiptValid){
    return (
      <ContainerDiv>
        <Helmet>
            <meta charSet="utf-8" />
            <title>KUITTI -  LAATULAKKI - YLIOPPILASLAKKI</title>
            <meta name="description" content="Tulosta kuittisi - Laatulakki - Ylioppilaslakki" />
        </Helmet>
        <PrintContainer><Navbar/></PrintContainer>


        <Container id="starter">

          <HeaderContainer>
            <CompanyContainer>
              Laatulakki Oy<br/>
              Y-tunnus: 3337953-9<br/>
              Kontionkatu 5 M<br/>
              05460 Hyvinkää, Finland
            </CompanyContainer>
            <Title>{t("receipt").toUpperCase()} </Title>
            <PrintContainer>
                <PrintIcon style={{float: "right"}} fontSize="large" onClick={() => window.print()}/>
            </PrintContainer>
          </HeaderContainer>
          <Hr/>
          

            <CustomerDetails>
                <BillingAddress>
                <H4>{t("ordererInfo")}</H4>
                <Address {...order?.billingAddress} />
                </BillingAddress>


                <DeliveryAddress>
                <H4>{t("receiverInfo")}</H4>
                <Address {...(order.deliverySameAsBilling ? order.billingAddress : order.deliveryAddress)} />
                </DeliveryAddress>

            </CustomerDetails>

            <CommentContainer>
                <Comment>
                <DetailsInfo>
                    {order.message && <CommentDetails>{t("order_extra_info")}: <CommentValueDetail>  {order.message}</CommentValueDetail></CommentDetails>}
                    
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
                            <b>{t("product")}:</b> {product.title?.replace("<br>"," / ")}
                        </ProductName>
                        <ProductColor><b>{t("color")}:</b> {product.color}</ProductColor>
                        <ProductSize>
                            <b>{t("size")}:</b> {product.size}
                        </ProductSize>
                        <ProductQuantity>
                            <b>Kpl:</b> {product.quantity}
                        </ProductQuantity>

                        <ProductPriceText>
                            <b>{t('vat')}:</b> {product.vatPercentage} %
                        </ProductPriceText>
                        <ProductPriceText>
                            <b>{t('tax')}:</b> {product.tax} €
                        </ProductPriceText>
                        <ProductPriceText>
                            <b>{t('tax_less')}:</b> {product.taxLess} €
                        </ProductPriceText>
                        {product.discount &&  
                          <ProductPriceText><b>{t("discount")}:</b> -{product.discount} %</ProductPriceText>
                        }
                        <ProductPriceText>
                            <b>{t("pricePerPiece")}:</b> {product.discount ? (product.price - (product?.price * (product.discount / 100)).toFixed(2)).toFixed(2) : product.price.toFixed(2) } €   
                        </ProductPriceText>
                        </Details>
                    </ProductDetail>


                    {product.customizedProduct ? (
                      <>
                        <ProductDetail>
                            <Details>
                              <CustomizedOptionsDiv>
                                <b>{t("Lyre")}:</b> {t(product?.customizationOptions.badge)} ({product?.customizationPrices.badge}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("DecorativeRibbon")}:</b> {t(product?.customizationOptions.roundRibbonColor)} ({product?.customizationPrices.roundRibbonColor}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("CordColor")}:</b> {t(product.customizationOptions.cordColor)} ({product?.customizationPrices.cordColor}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("FrontEmbroidery")}:</b> {product?.customizationOptions.embroidery?.embroideryTextFront?.left} {product?.customizationOptions.embroidery?.embroideryTextFront?.right}  ({product?.customizationPrices.embroideryTextFront}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("BackEmbroidery")}:</b> {product?.customizationOptions.embroidery?.embroideryTextBack} ({product?.customizationPrices.embroideryTextBack}€)
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("EmbroideryColor")}:</b> {t(product?.customizationOptions.embroidery?.embroideryTextColor)} 
                              </CustomizedOptionsDiv>
                              <CustomizedOptionsDiv>
                                <b>{t("EmbroideryFont")}:</b> {product?.customizationOptions.embroidery?.embroideryFont} 
                              </CustomizedOptionsDiv>
                            </Details>
                        </ProductDetail>
                      </>
                    ) :  <ProductDetail/>}



                    <PriceDetail>
                        <ProductPrice>
                          {product.discount ? (product.price - (product?.price * (product.discount / 100)).toFixed(2)).toFixed(2) * product.quantity :  (product.price * product.quantity).toFixed(2)} €
                        </ProductPrice>
                    </PriceDetail>
                </Product>
                ))}
            </div>
            <hr/>

            <CustomerDetails>
                <BillingAddress>
                    <DetailsInfo>
                      <Key>  </Key> <Key>{t('tax_less')}</Key>  <Key>{t('vat')}</Key> <Key>%</Key> <Key>{t('total')}</Key>
                    </DetailsInfo>

                    <DetailsInfo>
                      <Key>{t('productsInTotal')}</Key>
                      <Value>{order.products_in_total_taxLess} € </Value>
                      <Value>{order.products_in_total_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.products_in_total} € </Value>
                    </DetailsInfo>

                    { order.promoPercentage > 0 &&
                      <DetailsInfo>
                        <Key>{t('dicountCode')} ({order.promoPercentage}%)</Key>
                        <Value> - </Value>
                        <Value> - </Value>
                        <Value> - </Value>
                        <Value>-{order.promoAmount.toFixed(2)} €</Value>
                      </DetailsInfo>
                    }

                    <DetailsInfo>
                      <Key>{t('delivery')}</Key>
                      <Value>{order.delivery_taxLess} € </Value>
                      <Value>{order.delivery_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.deliveryPrice} € </Value>
                    </DetailsInfo>

                    <hr/>
                    <DetailsInfo>
                      <Key>{t('total')}</Key>
                      <Value>{order.totalPriceIncludeDelivery_taxLess} € </Value>
                      <Value>{order.totalPriceIncludeDelivery_tax} € </Value>
                      <Value>24 </Value>
                      <Value>{order.totalPriceIncludeDelivery} € </Value>
                    </DetailsInfo>
                </BillingAddress>
            </CustomerDetails>
    
        </Container>
      </ContainerDiv>
    )
  }else{
    return(
      <ContainerDiv>
        <div>Loading...</div>
      </ContainerDiv>
    )
  }
  
}

export default Receipt