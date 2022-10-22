import '../../common/css/style.css';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import {  saveDeliveryMethod } from '../../redux/cartRedux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';



const DeliveryMethod = ({navigation}) => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { register, handleSubmit, formState: { errors: customerPaymentMethodError } } = useForm();
  const dispatch = useDispatch()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const handlePaymentMethod = (data) => {
    const deliveryMethodConst = {
      deliveryMethod: data.deliveryMethod,
      deliveryPrice: Number(parseFloat(data.deliveryPrice, 10).toFixed(2))
    }
    console.log(deliveryMethodConst)
    dispatch(saveDeliveryMethod(deliveryMethodConst));
    navigation.next()
  }
  //console.log(customerPaymentMethodError)
  //console.log(cart)

  //  {JSON.stringify(cart, null, 2)}
  return (
    <div className='container'>
    <div className="customer_information_form">
        <header className="header">
          <h2 className="heading">Valitse toimitustapaa</h2>
          <p>Meillä tällä hetkellä onnistuu pelkkä toimitus. Toimitusaika on 2-4 arkipäivää.</p>

          <input type="hidden" name="deliveryPrice" value="8" {...register("deliveryPrice",{ 
            required: false,
          })}/>

          <form id="paymentMethodForm" name="paymentMethodForm" onSubmit={handleSubmit(handlePaymentMethod)}>
            <div className="inputwrapper">
              <input type="radio" className="checkbox-input checkbox-larger" id="delivery" checked="checked" name="deliveryMethod" value="delivery"
              {...register("deliveryMethod",{ 
                required: true,
              })}
              required/>
              <label htmlFor="delivery" className="checkbox-label checkbox-label-larger">
                {t("delivery")} (8.00 €)
              </label>
            </div>

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
          </form>
        </header>
    </div>
    </div>
  )
};

export default DeliveryMethod;