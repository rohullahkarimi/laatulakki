import React, { useEffect, useState } from 'react';
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import '../../common/css/style.css';
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseProduct, decreaseProduct, deleteProduct } from '../../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const ProductPriceText = styled.span`
  display: block;
  color: #000;
  font-size: 16px;
`;


const CartProduct = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState(cart.quantity);
  const navigate = useNavigate()
  const { t } = useTranslation();

  const handleDelete = useCallback((product) => {
    setCartItems(cartItems - 1);
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    console.log(product);
  }, [dispatch, cartItems]);

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


  console.log(cart)
  useEffect(() => {
    console.log(cartItems)
    cartItems === 0 && navigate("/") 
  }, [cartItems, navigate]);
 
  return (
    <div >
      {cart.products.map((product) => (
      <Product key={product._id}>
        <ProductDetail>
          <Image src={product.img[0].thumbnail} />
          <Details>
            <ProductName>
              <b>{t("product")}:</b> {product.title?.replace("<br>"," / ")}
            </ProductName>
            <ProductId>
              <b>ID:</b> {product._id}
            </ProductId>
            {product.color && <ProductColor><b>{t("color")}:</b> {product.color}</ProductColor>}
            <ProductSize>
              <b>{t("size")}:</b> {product.size}
            </ProductSize>
            <ProductPriceText>
              <b>{t("pricePerPiece")}:</b> {product.price.toFixed(2)} €
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
            {(product.price * product.quantity).toFixed(2)} €
          </ProductPrice>
        </PriceDetail>
        <RemoveProduct>
          <RemoveProductContainer><DeleteOutline onClick={() => handleDelete(product)} style={{color: "tomato"}}/></RemoveProductContainer>
        </RemoveProduct>
      </Product>
    ))}
    </div>
  );
};

export default CartProduct;
