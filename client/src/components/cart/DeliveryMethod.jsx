import '../../common/css/style.css';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import {  saveDeliveryMethod } from '../../redux/cartRedux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
//import { format } from 'date-fns';
import { publicRequest } from '../../requestMethods';



const DeliveryMethod = ({navigation}) => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { register, handleSubmit, formState: { errors: customerPaymentMethodError } } = useForm();
  const dispatch = useDispatch()
  const freeDelivery = useRef(false);
  const [setting, setSetting] = useState({
    "status": false,
    "expire": "2023-02-22",
  })

  //console.log(setting)
  console.log(customerPaymentMethodError)

  useEffect(() => {
    // get setting data
    const getSetting = async ()=> {
      try{
          const res = await publicRequest.get("/setting");
          
          let updatedValue = {};
          updatedValue = {
            status: res.data[0].status,
            expire: res.data[0].expire,
          };
          
          setSetting(setting => ({
            ...setting,
            ...updatedValue
          }));
          
      }catch(err){
          console.log(err)
      }
    }
    getSetting()


    window.scrollTo(0, 0)
  }, [])

  
  // check delivery price
  const checkDeliveryCost = () => {
    if((cart.total - cart.discountAmount) >= 90){
      //console.log("> 90, yes free")
      freeDelivery.current = true;
    }else if(setting.status === true){
      var ExpireDate =  setting.expire;
      var CurrentDate = new Date();
      ExpireDate = new Date(ExpireDate);
      
      if(CurrentDate > ExpireDate){
        //console.log("free true, not free because the date is expired free")
        freeDelivery.current = false;
      }else{
        //console.log("free true, yes free")
        freeDelivery.current = true;
      }
    }else{
      //console.log("not free")
      freeDelivery.current = false;
    }
  }
  checkDeliveryCost()
 
  
  const handlePaymentMethod = (data) => {
    // check if price equal or over 90€, make the delivery free of charge 
    var deliveryPriceSet = 0
    if(!freeDelivery.current){
      deliveryPriceSet = Number(parseFloat(data.deliveryPrice, 10).toFixed(2))
    }

    console.log(deliveryPriceSet)
    const deliveryMethodConst = {
      deliveryMethod: data.deliveryMethod,
      deliveryPrice: deliveryPriceSet
    }
    console.log(deliveryMethodConst)
    dispatch(saveDeliveryMethod(deliveryMethodConst));
    navigation.next()
  }
  //console.log(customerPaymentMethodError)
  //console.log(cart)




  return (
    <div className='container'>
    <div className="customer_information_form">
        <header className="header">
          <h2 className="heading">{t('chooseDeliveryMethod')}</h2>
          <p>{t('weDeliverProductByPost')}</p>

          <input type="hidden" name="deliveryPrice" value="6.90" 
            {...register("deliveryPrice",{ 
              required: false,
            })}
          />

          <form id="paymentMethodForm" name="paymentMethodForm" onSubmit={handleSubmit(handlePaymentMethod)}>
            <div className="inputwrapper">
              <input type="radio" className="checkbox-input checkbox-larger" id="delivery" checked="checked" name="deliveryMethod" value="delivery"
              {...register("deliveryMethod",{ 
                required: true,
              })}
              required/>
              <label htmlFor="delivery" className="checkbox-label checkbox-label-larger">
                <span>{ freeDelivery.current === false ? t("delivery") + " (6.90 €)" : t("delivery") + " ("+t('freeOfCharge')+")" }</span><br/>
              </label>
            </div>
          </form>
        </header>
    </div>
    </div>
  )
};


/*
  <div className="inputwrapper">
    <input type="radio" className="checkbox-input checkbox-larger" id="pickup" name="deliveryMethod" value="pickup"
    {...register("deliveryMethod",{ 
      required: true,
    })}
    disabled/>
    <label htmlFor="pickup" className="checkbox-label checkbox-label-larger">
    {t("pickup")} ({t("notInUse")}!)
    </label>
  </div>
*/
export default DeliveryMethod;