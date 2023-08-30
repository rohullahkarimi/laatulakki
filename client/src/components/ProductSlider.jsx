import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/css/productSlider.css";
import styled from "styled-components";
import axios from "axios";
import BounceLoader from 'react-spinners/ClipLoader';
import i18n from "../i18n";
import { useTranslation } from "react-i18next";


const CheckMore = styled.div`
  margin: 15px 0;
  text-align: center;
  font-size: large;
  font-weight: 600;
`;

const ProductSlider = ({cat, cartProductId}) => {
  const [products, setProducts] = useState([])
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const selectedLang = i18n.language

  //console.log(cartProductId)


  useEffect(() =>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get(
          cat 
            ? process.env.REACT_APP_API_URL+`/products?category=${cat}` 
            : process.env.REACT_APP_API_URL+`/products`
        );
        setProducts(res.data);
        setLoading(false);
      }catch(err){
        console.log(err)
        setLoading(false);
      }
    };
    getProducts()
  },[cat, selectedLang]);


  const filteredProducts = products.filter(item => !cartProductId.includes(item._id));
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
    };

    
    return (
      <div>
        <CheckMore>{t('lookAlso')}</CheckMore>
        {loading === true ? ( 
          <BounceLoader /> 
        ) : (
          <Slider {...settings}>
          {
            filteredProducts.map((item, index) => <div key={index}><ProductCard   imgSrc={item.img[0].thumbnail} imgAlt={item.img[0].thumbnailAlt} title={item.title[0][selectedLang]} desc={item.desc[0][selectedLang]}  price={item.price} productid={item._id}/></div>)
          }
          </Slider>
        )}
      </div>
   
    );
}
export default ProductSlider;
