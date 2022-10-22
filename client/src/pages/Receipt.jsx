import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { mobile, smartPhone, tablet } from "../responsive";
import PrintIcon from '@mui/icons-material/Print';
import {
    Container
  } from 'react-bootstrap';
import { useSelector } from "react-redux";


const PrintContainer = styled.div`
  @media print {
    display: none;
  }
`;

const ContainerDiv = styled.div`
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
`;

const TermsOfDelivery = styled.span`
  color: blue;
  display: inline-block;
`;

const H4 = styled.h4`
`;

const CommentContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 0 10px 0 0;
`;

const Comment = styled.div`
  flex: 1;
`;



const Desc = styled.p`
    margin: 20px 0px;
`


const orderData = {
    "_id": "63513713575cf51e998927dd",
    "products": [
        {
            "productId": "63357e153a42c60c8f62c5d4",
            "title": "Ylioppilaslakki Musta vuori",
            "img": "https://www.salon.fi/pictures/thumbs240b/2731062cc23b89c07e.jpg",
            "color": "musta",
            "size": "57 cm",
            "quantity": 2,
            "price": 69.9,
            "vatPercentage": 24,
            "_id": "63357e153a42c60c8f62c5d4"
        },
        {
            "productId": "63357fda3a42c60c8f62c5dc",
            "title": "KULTAINEN LYYRA Kiinnitetään lakkiin",
            "img": "https://www.fredrikson.fi/wp-content/uploads/2021/03/suomalainen_yo_lyyra.jpg",
            "color": "18K kulta",
            "size": "16 mm",
            "quantity": 2,
            "price": 35.9,
            "vatPercentage": 24,
            "_id": "63357fda3a42c60c8f62c5dc"
        }
    ],
    "billingAddress": {
        "firstname": "Rohis",
        "lastname": "Testaaja",
        "streetAddress": "Kirkkarinkatu 6 A 5",
        "postalCode": "05900",
        "city": "Hyvinkää",
        "country": "FI",
        "phonenumber": "400269034",
        "email": "rohullahahmad99@gmail.com",
        "_id": "63513713575cf51e998927e0"
    },
    "deliveryAddress": {
        "firstname": "Rohis",
        "lastname": "Testaaja",
        "streetAddress": "Kirkkarinkatu 6 A 5",
        "postalCode": "05900",
        "city": "Hyvinkää",
        "country": "FI",
        "phonenumber": "400269034",
        "email": "rohullahahmad99@gmail.com",
        "_id": "63513713575cf51e998927e1"
    },
    "deliverySameAsBilling": true,
    "deliveryMethod": "delivery",
    "deliveryPrice": 8,
    "paid": false,
    "emailSent": false,
    "transactionId": "0628bdca-506e-11ed-8248-c305df701726",
    "total": 219.60000000000002,
    "message": "kiitos paljon! tilaus on mahtava ja super kaunis",
    "status": "pending",
    "createdAt": "2022-10-20T11:54:59.394Z",
    "updatedAt": "2022-10-20T11:54:59.889Z",
    "__v": 0
}

// make a new copy of product object, to sum the price in total
const productsArray = orderData.products.map(item => {
    var productPriceTax = (item.price / 1.24).toFixed(2);
    var productPriceTaxLess = (item.price - productPriceTax).toFixed(2);

    const productObject = {
      ...item, 
      priceInTotal : (item.price * item.quantity).toFixed(2),
      tax: productPriceTax,
      taxLess: productPriceTaxLess
    };
    return productObject;
})


// delivery 
var delivery_taxLess = (orderData.deliveryPrice / 1.24).toFixed(2);
var delivery_tax = (orderData.deliveryPrice - delivery_taxLess).toFixed(2);


// data for email
const replacements = {
    billingAddress: orderData.billingAddress,
    deliveryAddress: orderData.deliveryAddress, 
    message: orderData.message,
    products: productsArray,

    delivery_tax: delivery_tax,
    delivery_taxLess: delivery_taxLess,
    deliveryPrice: orderData.deliveryPrice.toFixed(2),

    totalIncludeTax: orderData.total.toFixed(2)
}


const CapUsage = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  //const location = useLocation();

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
  

    console.log(replacements)
  return (
    <ContainerDiv>
            <Container id="starter" style={{padding: "2% 0px 5% 0"}}>
                <Title>KUITTI 
                    <PrintContainer>
                        <PrintIcon style={{float: "right"}} fontSize="large" onClick={() => window.print()}/>
                    </PrintContainer>
                </Title>

                <CustomerDetails>
                    <BillingAddress>
                    <H4>{t("ordererInfo")}</H4>
                    <Address {...replacements.billingAddress} />
                    </BillingAddress>


                    <DeliveryAddress>
                    <H4>{t("receiverInfo")}</H4>
                    <Address {...(replacements.deliverySameAsBilling ? replacements.billingAddress : replacements.deliveryAddress)} />
                    </DeliveryAddress>

                </CustomerDetails>

                <CommentContainer>
                    <Comment>
                    <DetailsInfo>
                        {replacements.message && <Key>Tilauksen lisätiedot: </Key>}
                        {replacements.message && <Value>{replacements.message}</Value>}
                    </DetailsInfo>
                    </Comment>
                </CommentContainer>
                <Hr/>

                <div>
                    {replacements.products.map((product) => (
                    <Product key={product._id}>
                        <ImageContainer><Image src={product.img} /></ImageContainer>
                        <ProductDetail>
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
                                <b>ALV:</b> {product.vatPercentage} €
                            </ProductPriceText>
                            <ProductPriceText>
                                <b>Vero:</b> {product.tax} €
                            </ProductPriceText>
                            <ProductPriceText>
                                <b>Veroton:</b> {product.taxLess} €
                            </ProductPriceText>

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
                <hr/>

                <CustomerDetails>
                    <BillingAddress>
                        <DetailsInfo>
                        <Key>ALV yhteensä</Key>
                        <Value>12</Value>
                        </DetailsInfo>
                        <DetailsInfo>
                        <Key>Veroton summa ALV 0%</Key>
                        <Value>122</Value>
                        </DetailsInfo>
                        <DetailsInfo>
                        <Key>Yhteensä</Key>
                        <Value>{replacements.totalIncludeTax} € </Value>
                        </DetailsInfo>
                    </BillingAddress>
                </CustomerDetails>
        
            </Container>
    </ContainerDiv>
  )
}

export default CapUsage