import { Add, Remove } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import CartModal from "../components/CartModal"
import { useTranslation } from "react-i18next";
import { mobile, smallLaptop, smartPhone } from "../responsive"
import { useLocation } from "react-router";
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import $ from "jquery"
import Products from "../components/Products"
import i18n from "../i18n"

const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex; 
    ${smallLaptop({padding: "20px", flexDirection: "column"})}
    ${smartPhone({padding: "10px", flexDirection: "column"})}
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
    ${smallLaptop({padding: "20px"})}
    ${smartPhone({padding: "10px"})}
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
    margin: 30px 0px 0px 0px;
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

const LeftAmount = styled.p`
    font-size: 14px;
    width: 100%;
    margin: 5px 0px;
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

const IncludeTax = styled.p`
    display: inline-flex;
    background-color: transparent;
    margin: 0 0 0 3%;
    user-select: none;
    vertical-align: middle;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 14px;
    min-width: auto;
    padding: 2px 9px;
    border: 0.5px solid #bbbcbc;
    color: #bbbcbc;
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
  const selectedLang = i18n.language
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const [product, setProduct] = useState({

  })

  const [productInternationalizeDetails, setProductInternationalizeDetails] = useState({
    title: "",
    desc: "",
  })
  const [productDetails, setProductDetails] = useState()
  const [productColors, setProductColors] = useState()

  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [productStorage, setProductStorage] = useState("")
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);

  useEffect(() =>{
        const handleProductSet = (data) => {
            let title = ""
            let desc = ""
        
            if(selectedLang === "se"){
                title = data.title[0].se
                desc = data.desc[0].se
                setProductDetails(data.details[0].se)
                setProductColors(data.color[0].se)
            }else if(selectedLang === "en"){
                title = data.title[0].en
                desc = data.desc[0].en
                setProductDetails(data.details[0].en)
                setProductColors(data.color[0].en)
            }else{
                title = data.title[0].fi
                desc = data.desc[0].fi
                setProductDetails(data.details[0].fi)
                setProductColors(data.color[0].fi)
            }
            setProductInternationalizeDetails(previousInputs => ({ ...previousInputs, title: title }))
            setProductInternationalizeDetails(previousInputs => ({ ...previousInputs, desc: desc }))
        }

        const getProduct = async ()=> {
            try{
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
                handleProductSet(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getProduct()
  }, [id, selectedLang]);

  const handleQuantity = (type)=>{
    if(type === "decrease"){
        quantity > 1 && setQuantity(quantity-1)
    }else{
        setQuantity(quantity+1)
    }
  }

  //console.log(size, color)

  const handleSizeSelection = (e) =>{
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll('option')[idx];
    const storage = option.getAttribute('data-storage');

    setSize(e.target.value)
    setProductStorage(storage)
  }

  const handleClick = () =>{
    if(productColors.length > 1 && !color){
        $(".generalError").text(t('choose')+" "+t('color'));
        return false
    }
    if(!size){
        $(".generalError").text(t('choose')+" "+t('size'));
        return false
    }
    if(quantity > productStorage){
        $(".generalError").text(t('stockExceed'));
        return false
    }
    let productId = product._id
    let title = product.title[0].fi
    let img = product.img[0].thumbnail

  
   
    // update cart
    dispatch(
        addProduct({ ...product, title, img, quantity, color, size, productId, productStorage})
    )
    setModalShow(true)
  }

    /*
    console.log(product)
    console.log(productInternationalizeDetails)
    console.log(productDetails)
   
    console.log(product)
    console.log(productColors)
     */

    let errorElement
    if(!size){
        errorElement = <GeneralError className="generalError"></GeneralError>
    }else if (!color){
        errorElement = <GeneralError className="generalError"></GeneralError>
    }else if (quantity > productStorage){
        errorElement = <GeneralError className="generalError"></GeneralError>
    }else{
        errorElement = ""
    }

    let instructionElements;
    if (product.categories?.includes('lakki')) {
        instructionElements = <InstructionContainer><InstructionItem href="/cap_choice">{t('sizeInstruction')}</InstructionItem><InstructionItem href="/cap_usage">{t('usageDetails')}</InstructionItem></InstructionContainer>
    }

    const checkTotalProductSizeAmount = () => {
        let productSizeQuantity = 0
        product.size?.map((productSize, j) => productSizeQuantity += productSize.storage)
        return(
            productSizeQuantity <= 0 ? true : false
        )
    }

   
    
    return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
           
            <ImageContainer>
                {product.discount &&<span className="flag-discount">-{product.discount}%</span>}
                {product?.img && <ImageGallery items={product?.img}  showFullscreenButton={false} showPlayButton={false} showBullets={true}/>}
            </ImageContainer>
            <InfoContainer>

                <Title>{productInternationalizeDetails.title}</Title>
            
                <Desc>{productInternationalizeDetails.desc}</Desc>

                <DetailsPartContainer>
                    {productDetails?.length > 0 && <h4>{t('especialInfo')}</h4>}
                    {productDetails?.map((detailsName, j) => {
                        return(<DetailsPart key={j}><b>{detailsName.name}</b>: {detailsName.desc}</DetailsPart>)
                    })}
                </DetailsPartContainer>
               

                {instructionElements}

              
                
            
                {product.discount && <Price>{ product?.price - (product?.price * (product.discount / 100)).toFixed(2)} ??? </Price> }

                {product.discount ? <Price><s className="originalPrice">{product?.price && product?.price.toFixed(2)} ???</s><IncludeTax>{t('includeTax')}</IncludeTax></Price> : <Price>{product?.price && product?.price.toFixed(2)} ??? <IncludeTax>{t('includeTax')}</IncludeTax></Price>}
            
                
                <FilterContainer>
                    <Filter>
                        {productColors?.length > 1 &&
                        <>
                            <FilterTitle>{t("color")}</FilterTitle>
                            <FilterColorSelect onChange={(e)=> setColor(e.target.value)} required>
                                <FilterColorOption value="" key="">{t('choose')}</FilterColorOption>
                                {productColors?.map((colorName, j) => {
                                    return(<FilterColorOption key={j}>{colorName.name}</FilterColorOption>)
                                })}
                            </FilterColorSelect>
                         </>
                        }
                    </Filter>
                    <Filter>
                        <FilterTitle>{t("size")}</FilterTitle>
    
                        <FilterSize onChange={handleSizeSelection} required>
                            <FilterSizeOption value="" key="">{t('choose')}</FilterSizeOption>
                            {product.size?.map((productSize, j) => {
                                return(<FilterSizeOption data-storage={productSize.storage} value={productSize.name} key={j} disabled={productSize.storage <= 0 ? true : null}>{productSize.name} {productSize.unit}</FilterSizeOption>)
                            })}
                        </FilterSize>
                    </Filter>
                    {productStorage &&<LeftAmount>{t('leftAmount')} {productStorage} {t('quantity')}</LeftAmount>}
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("decrease")}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("increase")}/>
                    </AmountContainer>
                    <Button onClick={handleClick} disabled={checkTotalProductSizeAmount() === true ? true : null}>{checkTotalProductSizeAmount() === true ? t('soldOut') : t('buy')}</Button>
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