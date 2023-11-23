import React from 'react'; // Make sure you have this import
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import i18n from "../i18n"
import { Recycling } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Info = styled.div`
    opacity: 0; 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    position: relative;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 2% 0%;

    &:hover ${Info}{
        opacity: 1;
    }
    
`


const Image = styled.img`
    max-height: 80%;
    max-width: 90%;
    z-index: 2;
    /* margin-bottom: 20%; */
`

const Name = styled.div`
`

const NameContainer = styled.div`
    width: 100%;
    height: auto;
    background: #ffffff;
    position: absolute;
    bottom: 6%;
    text-align: left;
    font-size: 14px;
`
const Price = styled.div`
    width: 100%;
    height: auto;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    text-align: left;
    font-size: 15px;
`
const PriceDiscount = styled.div`
    /*width: 100%;*/
    height: auto;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 65px;
    font-size: 15px;
`

const UsedLabel = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #009300;
    color: white;
    padding: 3px 8px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    z-index: 4;
    font-size: 12px;
`;

const SoldOutLabel = styled.div`
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    background-color: #ce8787;
    color: white;
    text-align: center;
    font-size: 18px;
    z-index: 4;
`;

const Product = ({used, item}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const selectedLang = i18n.language;
    const isSoldOut = item.size.every((size) => size.storage === 0);
 
    let title = ""
    if(selectedLang === "se"){
        title = item.title[0].se
    }else if(selectedLang === "en"){
        title = item.title[0].en
    }else{
        title = item.title[0].fi
    }

    
  


  const navigateToProductPage = () =>{
    const productTitleForUrl = title.replace(/\s+/g, '-').toLowerCase();
    navigate(`/product/${productTitleForUrl}/${item._id}`)
  }


  return (
    <Container onClick={navigateToProductPage}>
        {used && (
            <UsedLabel>
                <Recycling style={{ fontSize: 16, marginRight: 5 }} />
                {t('used')}  
            </UsedLabel>
        )}

        {isSoldOut && (
            <SoldOutLabel>
                {t('soldOut')}
            </SoldOutLabel>
        )}

        {item.discount &&<span className="flag-discount-productList">-{item.discount}%</span>}
        <Image loading="lazy" alt="product image" src={item.img[0].original}/>
        <Info>
        </Info>
        
        <NameContainer> 
            <Name>{title}</Name>
        </NameContainer> 
        
       
        
        {item.discount ? <Price>{ (item.price - (item.price * (item.discount / 100)).toFixed(2))} € </Price> : <Price>{item.price.toFixed(2)} €</Price>}
        {item.discount && <PriceDiscount><s className="originalPriceProductList">{item?.price && item?.price.toFixed(2)} €</s></PriceDiscount>}
    </Container>
  )
}

export default Product