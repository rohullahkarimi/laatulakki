import React, { useEffect, useState } from 'react';
import { Add, DeleteForeverOutlined, Remove } from "@mui/icons-material";
import '../../common/css/style.css';
import styled from "styled-components";
import { mobile, smartPhone, tablet } from "../../responsive";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseProduct, decreaseProduct, deleteProduct } from '../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  /*${smartPhone({ flexDirection: "column" })}*/
`;

const ProductDetail1 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  /*${tablet({ flexDirection: "column", alignItems: "center" })}*/
`;

const ProductDetail2 = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: flex-start;
  flex-direction: column;
  /*${tablet({ flexDirection: "column", alignItems: "center" })}*/
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  ${smartPhone({ width: "80px" })}
  ${mobile({ width: "60px" })}
`;

const DetailsContainer = styled.div`
  flex: 1;
  padding-left: 3%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
  ${smartPhone({ fontSize: "14px" })}
  ${mobile({ fontSize: "12px" })}
`;





const CustomizedOptionsDiv = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;

const ProductDiscount = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;




const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${smartPhone({ margin: "5px 5px" })}
`;

const ProductPrice = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  ${smartPhone({ fontSize: "16px" })}
  ${mobile({ fontSize: "14px" })}
`;
const RemoveProduct = styled.div`
  flex: 1;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RemoveProductContainer = styled.div`
  flex: 1;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPriceContainer = styled.div`
  flex: 1;
  align-items: center;
  margin-bottom: 20px;
`;



const Hr = styled.hr`
  width: 80%;
  background-color: #dad8d8;
  border: none;
  height: 1px;
  text-align: center;
  margin: auto;
`;

const CartProduct = (props) => {
  //console.log(props)
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState(cart.quantity);
  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  
  const handleDelete = useCallback((product) => {
    setCartItems(cartItems - 1);
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    //console.log(product);
  }, [dispatch, cartItems]);

  const handleQuantityIncrease = useCallback((product) => {
    if(product.quantity < product.productStorage){
      dispatch(
        increaseProduct({
          id: product._id,
          price: product.price,
          discount: product.discount
        })
      );
    }else{
      alert(t('stockExceed'))
    }
  }, [dispatch, t]);

  const handleQuantityDecrease = useCallback((product) => {
    dispatch(
      decreaseProduct({
        id: product._id,
        price: product.price,
        discount: product.discount
      })
    );
    //console.log(product);
  }, [dispatch]);


  //console.log(cart)
  useEffect(() => {
    //console.log(cartItems)
    cartItems === 0 && navigate("/") 
  }, [cartItems, navigate]);

  const capitalizeFirstLowercaseRest = str => {
    return (
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };
 
  return (
    <div >
      {cart.products.map((product, index) => (
      <Product key={product._id+product.size}>
        <ProductDetail1>
          <ImageContainer>
            <Image src={product.img} />
          </ImageContainer>
          
          <DetailsContainer>
            <Details>
              <ProductName>
              {product.title}
              </ProductName>
            </Details>
          </DetailsContainer>
         

          <ProductPriceContainer>
            {product.discount && <ProductPrice>{ ((product.price - (product.price * (product.discount / 100)).toFixed(2)) * product.quantity).toFixed(2)} € </ProductPrice> }

            {product.discount ? <ProductPrice><s className="originalPriceCart">{product.price && (product.price * product.quantity).toFixed(2)} €</s></ProductPrice> : <ProductPrice>{product.price && (product.price * product.quantity).toFixed(2)} € </ProductPrice>}
          </ProductPriceContainer>
         

         

          {props.page !== "review" ?
            <RemoveProduct>
              <RemoveProductContainer><DeleteForeverOutlined onClick={() => handleDelete(product)} style={{color: "tomato"}}/></RemoveProductContainer>
              <ProductAmountContainer>
                <Remove onClick={()=>handleQuantityDecrease(product)}/>
                <ProductAmount>{product.quantity}</ProductAmount>
                <Add onClick={()=>handleQuantityIncrease(product)}/>
              </ProductAmountContainer>
            </RemoveProduct>
            : <div></div>
          }

        </ProductDetail1>
        <ProductDetail2>

          {product.color && <CustomizedOptionsDiv><b>{t("color")}:</b> {product.color}</CustomizedOptionsDiv>}
          <CustomizedOptionsDiv>
            <b>{t("size")}:</b> {product.size}
          </CustomizedOptionsDiv>
          <CustomizedOptionsDiv>
            <b>{t("quantity")}:</b> {product.quantity}
          </CustomizedOptionsDiv>
          {product.discount &&<ProductDiscount><b>{t("discount")}:</b> -{product.discount} %</ProductDiscount>}
          <CustomizedOptionsDiv>
            <b>{t("pricePerPiece")}:</b> {product.discount ? product.price - (product.price * (product.discount / 100)).toFixed(2) : product.price.toFixed(2) } € 
          </CustomizedOptionsDiv>
  
        {product.customizedProduct && (
          <>
            <CustomizedOptionsDiv>
            <b>{t("Lyre")}:</b> {capitalizeFirstLowercaseRest(t(product?.customizationOptions.badge))}
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("DecorativeRibbon")}:</b> {capitalizeFirstLowercaseRest(t(product?.customizationOptions.roundRibbonColor))}
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("CordColor")}:</b> {capitalizeFirstLowercaseRest(t(product.customizationOptions.cordColor))}
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("FrontEmbroidery")}:</b> {product?.customizationOptions.embroidery?.embroideryTextFront?.left} {product?.customizationOptions.embroidery?.embroideryTextFront?.right} 
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("BackEmbroidery")}:</b> {product?.customizationOptions.embroidery?.embroideryTextBack}
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("EmbroideryColor")}:</b> {capitalizeFirstLowercaseRest(t(product?.customizationOptions.embroidery?.embroideryTextColor))}
            </CustomizedOptionsDiv>
            <CustomizedOptionsDiv>
            <b>{t("EmbroideryFont")}:</b> {capitalizeFirstLowercaseRest(product?.customizationOptions.embroidery?.embroideryFont)}
            </CustomizedOptionsDiv>
          </>
        )}
        </ProductDetail2>
        {index !== cart.products.length - 1 && <Hr/>}
      </Product>
    ))}
    </div>
  );
};

export default CartProduct;
