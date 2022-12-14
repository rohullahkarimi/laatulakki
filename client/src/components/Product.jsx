import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import i18n from "../i18n"

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
    background-color: #f5fbfd;
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

const Product = ({item}) => {
    const navigate = useNavigate();
    const selectedLang = i18n.language
 
    let title = ""
    if(selectedLang === "se"){
        title = item.title[0].se
    }else if(selectedLang === "en"){
        title = item.title[0].en
    }else{
        title = item.title[0].fi
    }
  


  const navigateToProductPage = () =>{
    navigate(`/product/${item._id}`)
  }

  //console.log(item)
  return (
    <Container onClick={navigateToProductPage}>
        {item.discount &&<span className="flag-discount-productList">-{item.discount}%</span>}
        <Image src={item.img[0].thumbnail}/>
        <Info>
        </Info>
        
        <NameContainer> 
            <Name>{title}</Name>
        </NameContainer> 
        
       
        <Price>{item.price.toFixed(2)} €</Price>
    </Container>
  )
}

export default Product