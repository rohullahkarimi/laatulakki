import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import CartModal from "../components/CartModal"
import { useTranslation } from "react-i18next";
import { mobile, smartPhone } from "../responsive"
import { useLocation } from "react-router";
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"
import { bodyColor } from "../theme"
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import $ from "jquery"
import Products from "../components/Products"





const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex; 
    //background-color: #${bodyColor};
    ${mobile({padding: "10px", flexDirection: "column"})}
    ${smartPhone({padding: "10px", flexDirection: "column"})}
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

const DetailsPartContainer = styled.div`
    margin-bottom: 10px;
`

const DetailsPart = styled.p`
    margin: 0px 0px;
`


const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    flex-direction: column;
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
    width: 20%;
`

const FilterSize = styled.select`
    margin: 10px;
    padding: 10px;
    width: 140px;
    border: 2px solid teal;
    cursor: pointer;
`

const FilterSizeOption = styled.option``

const FilterColorSelect = styled.select`
    margin: 10px;
    padding: 10px;
    width: 140px;
    border: 2px solid teal;
    cursor: pointer;
`

const FilterColorOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    width: 100%;
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
    width: 50px;
    height: 40px;
    border-radius: 0px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const GeneralError = styled.div`
    color: tomato;
    font-size: 18px;
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

const YouMightLike = styled.div`
    height: 35px;
    background-color: #f5fbfd;
    color: #101010;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
`

const InstructionContainer = styled.div`
    margin-bottom: 10px;
`
const InstructionItem = styled.a`
    display: block;
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
  const [modalShow, setModalShow] = useState(false);



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

  //console.log(size, color)

  const handleClick = () =>{
    if(!color){
        $(".generalError").text("Valitse väri");
        return false
    }
    if(!size){
        $(".generalError").text("Valitse koko");
        return false
    }
    let productId = product._id
    let title = product.title
    let img = product.img[0].thumbnail
    // update cart
    dispatch(
        addProduct({ ...product, title, img, quantity, color, size, productId})
    )
    setModalShow(true)
  }

    //console.log(product)

    let errorElement
    if(!size){
        errorElement = <GeneralError className="generalError"></GeneralError>
    }else if (!color){
        errorElement = <GeneralError className="generalError"></GeneralError>
    }else{
        errorElement = ""
    }

    let instructionElements;
    let sizeUnit;
    if (product.categories?.includes('lakki')) {
        instructionElements = <InstructionContainer><InstructionItem href="/cap_choice">Ohjeet mittaukseen</InstructionItem><InstructionItem href="/cap_usage">Lakin käyttö- ja hoito ohje</InstructionItem></InstructionContainer>
        sizeUnit = "cm"
    }else if(product.categories?.includes('lyyra')){
        sizeUnit = "mm"
    }

    return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                {product?.img && <ImageGallery items={product?.img}  showFullscreenButton={false} showPlayButton={false} showBullets={true}/>}
            </ImageContainer>
            <InfoContainer>
                {product.title?.split("<br>").map((productName, j) => {
                return (
                    <Title key={j}>{productName}</Title>
                );
                })}
                <Desc>{product.desc}</Desc>

                <DetailsPartContainer>
                    {product.details?.length > 0 && <h4>Yksityiskohdat</h4>}
                    {product.details?.map((detailsName, j) => {
                        return(<DetailsPart key={j}><b>{detailsName.name}</b>: {detailsName.desc}</DetailsPart>)
                    })}
                </DetailsPartContainer>
               

                {instructionElements}

              
                
                {product.price && <Price>{product?.price.toFixed(2)} €</Price>}
                <FilterContainer>
                    <Filter>
                        <FilterTitle>{t("color")}</FilterTitle>
                        <FilterColorSelect onChange={(e)=> setColor(e.target.value)} required>
                            <FilterColorOption value="" key="">Valitse</FilterColorOption>
                            {product.color?.map((s)=>(
                                <FilterColorOption key={s}>{s}</FilterColorOption>
                            ))}
                        </FilterColorSelect>
                    </Filter>
                    <Filter>
                        <FilterTitle>{t("size")}</FilterTitle>
                        
                        <FilterSize onChange={(e)=>setSize(e.target.value)} required>
                            <FilterSizeOption value="" key="">Valitse</FilterSizeOption>
                            {product.size?.map((s)=>(
                                <FilterSizeOption key={s}>{s} {sizeUnit}</FilterSizeOption>
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
                    <Button onClick={handleClick}>{t("buy")}</Button>
                </AddContainer>
                {errorElement}
               
            </InfoContainer>
            
        </Wrapper>

        <YouMightLike>{t("youMightLike")}</YouMightLike>
        <Products selectedProduct={id}/>
        <Footer/>
        <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  )
}

export default Product