import React from 'react'; // Make sure you have this import
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material"
import "../common/css/yolakki.css";
import { useCustomization } from "../contexts/Customization";
import { laptop, mobile } from "../responsive";
import { BlockOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import $ from "jquery"
import ReadMoreModal from './ReadMoreModal';
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"
import ReactPixel from 'react-facebook-pixel';
import CartModal from './CartModal';
import CapChoiceModal from "../components/CapChoiceModal"
import CapUsageModal from "../components/CapUsageModal"

ReactPixel.pageView(); // For tracking page view


const Fonts = [
  { name: "kauno"},
  { name: "tekstaus" },
  // Add more fonts if needed
];


const Title = styled.h1`
    font-weight: 200;
    margin: 0;
`

const Desc = styled.p`
    margin: 0px 0px;
`


const CheckoutDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`


const ValueDiv = styled.div`
    padding: 16px 0;
    width: 100%;
`

const InputDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    ${laptop({flexDirection: "column"})}
`

const InputDivCol1 = styled.div`
    flex: 1;
    padding: 0 5px 0 0;
    width: 100%;
    ${laptop({padding: "0 0 10px 0"})}
`
const InputDivCol2 = styled.div`
    flex: 1;
    padding: "0 0 0 10px";
    width: 100%;
    ${laptop({padding: "0 0 5px 0"})}
`



const OptionTitlesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const OptionTitle = styled.div`
    flex: 1;
`

const OptionPrice = styled.div`
    flex: 1;
    text-align: right;
`




const SimpleFlexContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const SimpleFlexContainerCol = styled.div`
  flex: 1;
`


const CheckoutPrice = styled.div`
    flex: 1;

    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
`

const CheckoutPriceCol = styled.div`
  flex: 1;

  font-size: ${(props) => props.size};
  font-weight: 500;
  line-height: 1.33;
`




const CheckoutButton = styled.div`
    flex: 2;
`

const Button = styled.button`
    width: 100%;
    padding: 15px;
    
    border: 2px solid #14aeae;
    background-color: #14aeae;
    
    /*
    border: 2px solid #ff46e4;
    background-color: #ff46e4;
    */
    color: #fff;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        
        background-color:  #1b8484;
        border: 2px solid #1b8484;
        
        /*
        background-color:  #da4ac4;
        border: 2px solid #da4ac4;
        */
        color: #fff;
    }
`


const FilterContainer = styled.div`
    float: right;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterSize = styled.select`
    padding: 10px;
    width: 140px;
    border: 2px solid teal;
    cursor: pointer;
`

const FilterSizeOption = styled.option``

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


const LeftAmount = styled.p`
    font-size: 14px;
    width: 100%;
    margin: 5px 0px;
`

const GeneralError = styled.div`
    color: tomato;
    font-size: 18px;
`


const ReadMoreButton = styled.button`
  font-weight: 500;
  text-decoration: none;
  color: rgb(10, 11, 10);
  cursor: pointer;
`

const InstructionContainer = styled.div`
    margin-bottom: 0px;
`
const InstructionItem = styled.a`
    cursor: pointer;
    display: block;
`

const FreeRefund = styled.p`
    padding: 10px 0;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 0;
`

const GetTotalPrice = (prices) => {
  const {
    customization
  } = useCustomization();
  let totalPrice = prices.cap_base_price;

  // Add the price of the selected badge
  totalPrice += prices.badge;

  // Add the price of the selected round ribbon color
  totalPrice += prices.roundRibbonColor;

  // Add the price of the selected cord color
  totalPrice += prices.cordColor;

  // Add the price of the embroidery on the front
  totalPrice += prices.embroideryTextFront;

  // Add the price of the embroidery on the back
  totalPrice += prices.embroideryTextBack;

  // Add the price of the quantity
  totalPrice = totalPrice * customization.quantity;

  return totalPrice;
};


const Configurator = () => {
    const { t } = useTranslation();
    const selectedLang = i18n.language
    const [productInternationalizeDetails, setProductInternationalizeDetails] = useState({
      title: "",
      desc: "",
    })
    const [errors, setErrors] = useState([]);
    const [showReadMoreModal, setShowReadMoreModal] = useState(false);
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [modalShowCapChoice, setModalShowCapChoice] = useState(false);
    const [modalShowCapUsage, setModalShowCapUsage] = useState(false);
    const {
      customization,
      setCustomization,
      prices,
      setPrices,
      graduationCapCustomizationOptions,
    } = useCustomization();


    const getTotalPrice = (pricesObject) => {
      let total = 0;
    
      // Iterate through the object properties and add their values to the total
      for (const key in pricesObject) {
        if (pricesObject.hasOwnProperty(key)) {
          total += pricesObject[key];
        }
      }
    
      return total;
    };

    const totalPrice = getTotalPrice(prices);
    //console.log(totalPrice)
    
  

    const [customizeProduct, setCustomizeProduct] = useState({
      title: graduationCapCustomizationOptions.title[0].fi,
      desc: graduationCapCustomizationOptions.desc[0].fi,
      img: graduationCapCustomizationOptions.img[2].thumbnail,
      productId: "123456789",
      vatPercentage: 24,
    });



    // Function to toggle the Modal visibility
    const handleToggleModal = () => {
      setShowReadMoreModal((prevShowReadMoreModal) => !prevShowReadMoreModal);
    };

    // Function to show the full text in the Modal
    const handleReadMore = () => {
      handleToggleModal();
    };

    const handleCapChoice = (event) => {
      event.stopPropagation();
      event.preventDefault();
      setModalShowCapChoice(true)
  }

  const handleCapUsage = (event) => {
      event.stopPropagation();
      event.preventDefault();
      setModalShowCapUsage(true)
  }

  


    console.log(customization, prices)

    useEffect(() =>{
      const handleProductSet = (data) => {
          let title = ""
          let desc = ""
      
          if(selectedLang === "se"){
              title = data.title[0].se
              desc = data.desc[0].se
          }else if(selectedLang === "en"){
              title = data.title[0].en
              desc = data.desc[0].en
          }else{
              title = data.title[0].fi
              desc = data.desc[0].fi
          }
          setProductInternationalizeDetails(previousInputs => ({ ...previousInputs, title: title }))
          setProductInternationalizeDetails(previousInputs => ({ ...previousInputs, desc: desc }))
      }
      handleProductSet(graduationCapCustomizationOptions);
  }, [selectedLang, graduationCapCustomizationOptions]);


    const handleCustomizationChange = (optionName, optionValue, optionPrices) => {
        setCustomization((prevCustomization) => ({
          ...prevCustomization,
          [optionName]: optionValue,
        }));
        setPrices((prevPrices) => ({
          ...prevPrices,
          [optionName]: optionPrices,
        }));
    };


    const handleEmbroideryFrontTextChange = (textType, textValue, textPrice) => {
        setCustomization((prevCustomization) => ({
          ...prevCustomization,
          embroidery: {
            ...prevCustomization.embroidery,
            embroideryTextFront: {
              ...prevCustomization.embroidery.embroideryTextFront,
              [textType]: textValue,
            },
          },
        }));

        setPrices((prevPrices) => ({
          ...prevPrices,
          embroideryTextFront: textPrice,
        }));
    };

    const handleEmbroideryTextBackChange = (value, price) => {
        // Calculate the price based on the length of the text
        let textPrice = price; // Replace this with your actual pricing logic
     

        setCustomization((prevCustomization) => ({
          ...prevCustomization,
          embroidery: {
            ...prevCustomization.embroidery,
            embroideryTextBack: value,
          },
        }));
      
        setPrices((prevPrices) => ({
          ...prevPrices,
          embroideryTextBack: textPrice,
        }));
    };
      
    const handleEmbroideryTextColor = (value) => {
      setCustomization((prevCustomization) => ({
        ...prevCustomization,
        embroidery: {
          ...prevCustomization.embroidery,
          embroideryTextColor: value,
        },
      }));
    };
 
    const handleSizeSelection = (e) =>{
      setErrors([]); // Set the 'errors' state back to an empty array
      const idx = e.target.selectedIndex;
      const option = e.target.querySelectorAll('option')[idx];
      const storage = option.getAttribute('data-storage');
  
    
      setCustomization({
        ...customization,
        size: e.target.value,
        productStorage: storage
      });

      
    }

    const handleQuantity = (type) => {
      if (type === "decrease" && customization.quantity > 1) {
        setCustomization((prevCustomization) => ({
          ...prevCustomization,
          quantity: prevCustomization.quantity - 1,
        }));
      } else if (type === "increase") {
        setCustomization((prevCustomization) => ({
          ...prevCustomization,
          quantity: prevCustomization.quantity + 1,
        }));
      }
    };
    
    // 3D fonts
    const textFrontLeft = customization.embroidery.embroideryTextFront.left; 
    const textFrontRight = customization.embroidery.embroideryTextFront.right;
    const textBack = customization.embroidery.embroideryTextBack;
    const font = customization.embroidery.embroideryFont;
    const color = customization.embroidery.embroideryTextColor;

  


    const handleFontClick = ( name) => {
      const fontName = name;

      setCustomization((prevCustomization) => ({
        ...prevCustomization,
        embroidery: {
          ...prevCustomization.embroidery,
          embroideryFont: fontName,
        },
      }));
    };

    const getSizeStorage = (selectedSize) => {
      const sizeInfo = graduationCapCustomizationOptions.size.find(size => size.name === selectedSize);
      return sizeInfo ? sizeInfo.storage : 0; // Return the storage value or 0 if not found
    };

    const handleEmbroideryFocusChange = (value) => {
      setCustomization((prevCustomization) => ({
        ...prevCustomization,
        focus: value,
      }));
    };

    const handleCheckOut = () =>{
      const newErrors = [];
      if (!customization.size) {
        newErrors.push(t('choose') + ' ' + t('size'));
        setErrors(newErrors);
        return false;
      }
      if (customization.size && customization.quantity > customization.productStorage) {
        newErrors.push(t('stockExceed'));
        setErrors(newErrors);
        return false;
      }
      
    

      // update cart
      dispatch(
        addProduct({...customizeProduct, 
          // for customized product
          customizedProduct: true,
          badge: customization.badge,
          roundRibbonColor: customization.roundRibbonColor,
          cordColor: customization.cordColor,
          embroidery: customization.embroidery,

          price: totalPrice, 
          size: customization.size,  
          quantity: customization.quantity,
          inStock: true,
          productStorage: getSizeStorage(customization.size)

        })
      )
      
      setModalShow(true)
      ReactPixel.track("track", "Buy-button"); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
    }

 
  
      
    return (
    <div className="configurator">
        <Title>{productInternationalizeDetails.title}</Title>
        <div>
          <Desc>{productInternationalizeDetails.desc.substring(0, productInternationalizeDetails.desc.indexOf('.', productInternationalizeDetails.desc.indexOf('.') + 1) + 1)} <ReadMoreButton onClick={handleReadMore}>{t('readMore')}</ReadMoreButton></Desc>
          <ReadMoreModal title={productInternationalizeDetails.title} text={productInternationalizeDetails.desc} show={showReadMoreModal} handleClose={handleToggleModal} />
        </div>

        <div style={{ display: graduationCapCustomizationOptions.onOff.badge ? 'block' : 'none' }} id="customization_section_1"  className="configurator__section">
          <OptionTitlesContainer>
            <OptionTitle className="configurator__section__title">{t('badge')}</OptionTitle>
            {prices.badge > 0 && <OptionPrice>+{prices.badge} €</OptionPrice>}
          </OptionTitlesContainer>
          <div className="configurator__section__values">
            {graduationCapCustomizationOptions.badge.map((item, index) => {
              // Get the badge name based on the selected language (selectedLang)
              const badgeName = item.name[selectedLang][0].name;

              return (
                <div
                  style={{ display: item.enabled ? 'block' : 'none' }}
                  key={index}
                  className={`item ${customization.badge === item.name["en"][0].name ? "item--active" : ""}`}
                  onClick={() => handleCustomizationChange("badge", item.name["en"][0].name, item.price)}
                >
                  <div className="item__label">{badgeName}</div>
                </div>
              );
            })}
          </div>
        </div>



      <div style={{ display: graduationCapCustomizationOptions.onOff.roundRibbonColor ? 'block' : 'none' }} id="customization_section_2" className="configurator__section">
        <OptionTitlesContainer>
                <OptionTitle className="configurator__section__title">{t('decorative_band')}</OptionTitle>
                {prices.roundRibbonColor > 0 && <OptionPrice>+{prices.roundRibbonColor} €</OptionPrice>}
        </OptionTitlesContainer>
            <div className="configurator__section__values">

            <div  onClick={() => handleCustomizationChange("roundRibbonColor", "", 0)}>
                <BlockOutlined sx={{fontSize: "32px"}}/>
                <div className="item__label">Poista</div>
            </div>


          {graduationCapCustomizationOptions.roundRibbonColor.map((item, index) => {
            // Get the badge name based on the selected language (selectedLang)
            const badgeName = item.name[selectedLang][0].name;

            return (
            <div
              style={{ display: item.enabled ? 'block' : 'none' }}
              key={index}
              className={`item ${
                item.name["en"][0].name === customization.roundRibbonColor ? "item--active" : "ss"
              }`}
              onClick={() => handleCustomizationChange("roundRibbonColor", item.name["en"][0].name, item.price)}
            >
              <div
                className="item__dot"
                style={{ backgroundColor: item.color }}
              />
              <div className="item__label">{badgeName}</div>
            </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: graduationCapCustomizationOptions.onOff.cordColor ? 'block' : 'none' }} id="customization_section_3" className="configurator__section">
        <OptionTitlesContainer>
            <OptionTitle className="configurator__section__title">{t('cap_cord')}</OptionTitle>
            {prices.cordColor > 0 &&  <OptionPrice>+{prices.cordColor} €</OptionPrice>}
        </OptionTitlesContainer>
        <div className="configurator__section__values">

          {graduationCapCustomizationOptions.cordColor.map((item, index) => {

            // Get the badge name based on the selected language (selectedLang)
            const badgeName = item.name[selectedLang][0].name;

            return (
            <div
              style={{ display: item.enabled ? 'block' : 'none' }}
              key={index}
              className={`item ${
                item.name["en"][0].name === customization.cordColor ? "item--active" : ""
              }`}
              onClick={() => handleCustomizationChange("cordColor", item.name["en"][0].name, item.price)}
            >
              <div
                className="item__dot"
                style={{ backgroundColor: item.color }}
              />
              <div className="item__label">{badgeName}</div>
            </div>
            );
          })}
        </div>
      </div>

        <div style={{ display: graduationCapCustomizationOptions.onOff.embroideryTextFront ? 'block' : 'none' }} id="customization_section_4" className="configurator__section">
            <OptionTitlesContainer>
                <OptionTitle className="configurator__section__title">{t('front_text')}</OptionTitle>
                {prices.embroideryTextFront > 0 &&  <OptionPrice>+{prices.embroideryTextFront} €</OptionPrice>}
            </OptionTitlesContainer>

            <div className="configurator__section__values">
              {Fonts.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`item ${font === item.name ? "item--active" : ""}`}
                    onClick={() => handleFontClick(item.name, item.name)}
                  >
                    <div className="item__label">{item.name}</div>
                  </div>
                );
              })}
            </div>

            <div className="configurator__section__values">
              {graduationCapCustomizationOptions.embroideryTextFront.colors.map((item, index) => {
                const embroideryTextColor = item.name[selectedLang][0].name;
                return (
                  <div
                    key={index}
                    className={`item ${
                      color === item.name["en"][0].name ? "item--active" : ""
                    }`}
                    onClick={() => handleEmbroideryTextColor(item.name["en"][0].name)}
                  >
                    <div
                      className="item__dot"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="item__label">{embroideryTextColor}</div>
                  </div>
                  );
              })}
            </div>
          
            <InputDiv>
                <InputDivCol1>  
                    <div className="input-group-simple">
                        <input 
                          type='text'
                          onFocus={() => handleEmbroideryFocusChange("frontleft")}
                          placeholder={t('firstname')}
                          value={textFrontLeft}
                          onChange={(e) =>
                            handleEmbroideryFrontTextChange("left", e.target.value, 8)
                          }
                          maxLength={13}
                        />
                        <label  htmlFor="left">{t('firstname')}</label>
                        <div className="req-mark">✓</div>
                    </div>
                </InputDivCol1>
                <InputDivCol2>
                    <div className="input-group-simple">
                        <input 
                          type='text'
                          onFocus={() => handleEmbroideryFocusChange("frontRight")}
                          placeholder={t('lastname')}
                          value={textFrontRight}
                          onChange={(e) =>
                            handleEmbroideryFrontTextChange("right", e.target.value, 8)
                          }
                          max={13}
                          maxLength={13}
                        />
                        <label htmlFor="right">{t('lastname')}</label>
                        <div className="req-mark">✓</div>
                    </div>
                </InputDivCol2>
            </InputDiv>

        </div>

        <div style={{ display: graduationCapCustomizationOptions.onOff.embroideryTextBack ? 'block' : 'none' }} id="customization_section_4" className="configurator__section">
            <OptionTitlesContainer>
                <OptionTitle className="configurator__section__title">{t('back_text')}</OptionTitle>
                {prices.embroideryTextBack > 0 &&  <OptionPrice>+{prices.embroideryTextBack} €</OptionPrice>}
            </OptionTitlesContainer>
            <ValueDiv>
                <div className="input-group-simple">
                    <input  
                      type='text'
                      onFocus={() => handleEmbroideryFocusChange("back")}
                      placeholder='Back'
                      value={textBack}
                      onChange={(e) =>
                        handleEmbroideryTextBackChange(e.target.value, 10)
                      }
                      maxLength={30}
                    />
                    <label htmlFor="back">{t('exampleYearText')}
                    </label>
                    <div className="req-mark">✓</div>
                </div>
            </ValueDiv>
        </div>


        <InstructionContainer>
          <InstructionItem  target="_blank" onClick={handleCapChoice}>{t('sizeInstruction')}</InstructionItem>
          <InstructionItem target="_blank" onClick={handleCapUsage}>{t('usageDetails')}</InstructionItem>
          <FreeRefund>{t('FreeRefund')}</FreeRefund>
        </InstructionContainer>
    
        <SimpleFlexContainer>
            <SimpleFlexContainerCol>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("decrease")}/>
                        <Amount>{customization.quantity}</Amount>
                        <Add onClick={()=>handleQuantity("increase")}/>
                    </AmountContainer>
                </AddContainer>
            </SimpleFlexContainerCol>
            <SimpleFlexContainerCol>
                <FilterContainer>
                    <Filter>
                        <FilterSize onChange={handleSizeSelection} required>
                            <FilterSizeOption value="" key="">{t('chooseSize')}</FilterSizeOption>
                            {graduationCapCustomizationOptions.size?.map((productSize, j) => {
                                return(<FilterSizeOption data-storage={productSize.storage} value={productSize.name} key={j} disabled={productSize.storage <= 0 ? true : null}>{productSize.name} {productSize.unit}</FilterSizeOption>)
                            })}
                        </FilterSize>
                    </Filter>
                    {customization.productStorage &&<LeftAmount>{t('leftAmount')} {customization.productStorage} {t('quantity')}</LeftAmount>}
                </FilterContainer>
            </SimpleFlexContainerCol>
        </SimpleFlexContainer>

        {/* Display the error messages */}
        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <GeneralError key={index}>{error}</GeneralError>
            ))}
          </div>
        )}

        <CheckoutDiv>
            <CheckoutPrice>
                <CheckoutPriceCol size="16px">{t('total').toUpperCase()}</CheckoutPriceCol>
                <CheckoutPriceCol size="22px">{GetTotalPrice(prices).toFixed(2)} €</CheckoutPriceCol>
            </CheckoutPrice>
            <CheckoutButton>
                <Button onClick={handleCheckOut}>Lisää ostoskoriin</Button>
            </CheckoutButton>
       </CheckoutDiv>
      
       <CartModal show={modalShow} onHide={() => setModalShow(false)} />
       <CapChoiceModal show={modalShowCapChoice} onHide={() => setModalShowCapChoice(false)} />
       <CapUsageModal show={modalShowCapUsage} onHide={() => setModalShowCapUsage(false)} />
    </div>
  );
};

export default Configurator;
