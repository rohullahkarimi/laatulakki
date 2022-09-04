import {  SearchOutlined} from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

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
    padding: 5% 0%;

    &:hover ${Info}{
        opacity: 1;
    }
    
`


const Image = styled.img`
    max-height: 80%;
    max-width: 90%;
    z-index: 2;
    margin-bottom: 20%;
`

const Name = styled.div`
`

const NameContainer = styled.div`
    width: 100%;
    height: 15%;
    background: #f5fbfd;
    position: absolute;
    bottom: 5%;
    text-align: center;
    font-size: 20px;
`
const Price = styled.div`
    width: 100%;
    height: 5%;
    background: #f5fbfd;
    position: absolute;
    bottom: 0;
    text-align: center;
    font-size: 20px;
    padding-bottom: 10px;
`



const Icon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

/*

        <NameContainer>
            
        </NameContainer>
        */

const Product = ({item}) => {
  const navigate = useNavigate();

  const navigateToProductPage = () =>{
    navigate(`/product/${item._id}`)
  }
  return (
    <Container onClick={navigateToProductPage}>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <Link to={`/product/${item._id}`}>
                    <SearchOutlined/>
                </Link>
            </Icon>
        </Info>
        
        <NameContainer> 
        {item.title.split("<br>").map((line, j) => {
          return (
            <Name key={j}>{line}</Name>
          );
        })}
        </NameContainer> 
        
       
        <Price>{item.price} €</Price>
    </Container>
  )
}

export default Product