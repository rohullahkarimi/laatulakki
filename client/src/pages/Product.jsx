import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { useTranslation } from "react-i18next";
import { mobile } from "../responsive"
import { useLocation } from "react-router";
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"
import { bodyColor } from "../theme"
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';


const images = [
    {
        original: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/oiva-600x400.jpg',
        thumbnail: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/oiva-600x400.jpg',
    },
    {
      original: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/sinivalkoinen_tekstaus_kauno-2-600x400.jpg',
      thumbnail: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/sinivalkoinen_tekstaus_kauno-2-600x400.jpg',
    },
    {
      original: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/sinivalkoinen-2-scaled-600x400.jpg',
      thumbnail: 'https://www.fredrikson.fi/wp-content/uploads/2021/03/sinivalkoinen-2-scaled-600x400.jpg',
    }
  ];


const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex; 
    //background-color: #${bodyColor};
    ${mobile({padding: "10px", flexDirection: "column"})}
`

const ImageContainer = styled.div`
    flex: 1;
`
/*
const Image = styled.img`
    width: 100%;
`
*/

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 10px;
    width: 120px;
    border: 2px solid teal;
    cursor: pointer;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    width: 120px;
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`


const Product = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const dispatch = useDispatch()


  useEffect(() =>{
      const getProduct = async ()=> {
        try{
            const res = await publicRequest.get("/products/find/" + id);
            setProduct(res.data);
        }catch(err){

        }
      }
      getProduct()
  }, [id]);

  const handleQuantity = (type)=>{
    if(type === "decrease"){
        quantity > 1 && setQuantity(quantity-1)
    }else{
        setQuantity(quantity+1)
    }
  }

  const handleClick = () =>{
    // update cart
    dispatch(
        addProduct({ ...product, quantity, color, size})
    )
  }

  //console.log(product);
  // <Image src={product.img}/>
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <ImageGallery items={images}  showFullscreenButton={false} showPlayButton={false} showBullets={true}/>
            </ImageContainer>
            <InfoContainer>
                {product.title?.split("<br>").map((productName, j) => {
                return (
                    <Title key={j}>{productName}</Title>
                );
                })}
                <Desc>{product.desc}</Desc>
                <Price>{product.price} €</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>{t("color")}</FilterTitle>
                        {product.color?.map((c)=>(
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                        ))}
                        
                        
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((s)=>(
                                <FilterSizeOption key={s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("decrease")}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("increase")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>Osta</Button>
                </AddContainer>
            </InfoContainer>
            
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product