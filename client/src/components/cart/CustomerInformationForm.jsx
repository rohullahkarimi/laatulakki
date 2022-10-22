//import React from 'react';
import '../../common/css/style.css';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  saveCustomerInformation } from '../../redux/cartRedux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BillingAddressForm = ({navigation}) => {
  const { t } = useTranslation();
  //console.log(navigation)
  const [deliveryAddressFormEnable, setDeliveryAddressFormEnable ] = useState(false)
 
  const cart = useSelector((state) => state.cart);
  const [deliverySameAsBillingCheckbox ] = useState(cart.deliverySameAsBilling)
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, setValue, getValues, formState: { errors: customerInfoErrors } } = useForm();
  
  /*
  function validateForm() {
    // billing address
    var b_firstname = cart.billingAddress.firstname; 
    var b_lastname = cart.billingAddress.lastname; 

    // delivery address
    var d_firstname = cart.deliveryAddress.firstname; 
    var d_lastname = cart.deliveryAddress.lastname; 
    if (!b_firstname || !b_lastname || !d_firstname || !d_lastname) {
      alert("Ole hyvä, täyttää kaikki lomakkeen tiedot ja muista tallenna.");
      return false;
    }
  }
  
  */

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleCustomerInformationSubmit = (data) => {
    console.log(data)
    dispatch(saveCustomerInformation(data));
    navigation.next()
  }
  //console.log(customerInfoErrors)
  //console.log(cart)

  useEffect(() => {
    let defaultValues = {};
    // billingAddress
    defaultValues.firstName = cart.billingAddress.firstname;
    defaultValues.lastName = cart.billingAddress.lastname;
    defaultValues.streetAddress = cart.billingAddress.streetAddress;
    defaultValues.postalCode = cart.billingAddress.postalCode;
    defaultValues.city = cart.billingAddress.city;
    defaultValues.phonenumber = cart.billingAddress.phonenumber;
    defaultValues.email = cart.billingAddress.email;
    defaultValues.comment = cart.message;

    // deliverySameAsBilling
    //setDeliverySameAsBillingCheckbox(cart.deliverySameAsBilling)

    // deliveryAddress
    defaultValues.deliveryAddress_firstName = cart.deliveryAddress.firstname;
    defaultValues.deliveryAddress_lastName = cart.deliveryAddress.lastname;
    defaultValues.deliveryAddress_streetAddress = cart.deliveryAddress.streetAddress;
    defaultValues.deliveryAddress_postalCode = cart.deliveryAddress.postalCode;
    defaultValues.deliveryAddress_city = cart.deliveryAddress.city;
    defaultValues.deliveryAddress_country = cart.deliveryAddress.country;
    defaultValues.deliveryAddress_phonenumber = cart.deliveryAddress.phonenumber;
    defaultValues.deliveryAddress_email = cart.deliveryAddress.email;


    
    reset({ ...defaultValues });
  }, [cart, reset]);

  const checkboxHandler = (e) => {
    console.log(e)
    
    if (e.target.type === 'checkbox' && !e.target.checked) {
      setValue('delivery_firstName', '');
      setValue('delivery_lastName', '');
      setValue('delivery_streetAddress', '');
      setValue('delivery_postalCode', '');
      setValue('delivery_city', '');
      setValue('delivery_country', '');
      setValue('delivery_phonenumber', '');
      setValue('delivery_email', '');
      setDeliveryAddressFormEnable(false);
    } else {
      setValue('deliveryAddress_firstName', getValues('firstName'));
      setValue('deliveryAddress_lastName', getValues('lastName'));
      setValue('deliveryAddress_streetAddress', getValues('streetAddress'));
      setValue('deliveryAddress_postalCode', getValues('postalCode'));
      setValue('deliveryAddress_city', getValues('city'));
      setValue('deliveryAddress_country', getValues('country'));
      setValue('deliveryAddress_phonenumber', getValues('phonenumber'));
      setValue('deliveryAddress_email', getValues('email'));
      setDeliveryAddressFormEnable(true);
    }
    
  }
  return (
    <div className='container'>
      <div className="customer_information_form">
        <form id="customerInformation" name="customerInformation" onSubmit={handleSubmit(handleCustomerInformationSubmit)}>
          
          <header className="header">
            <h2 className="heading">Tilaajan tiedot</h2>
            <p>Täyttää tilaajan tiedot. Voit jätä vastaannottajan tiedot täyttämättä jos tiaalaja on sama kuin vastaan dottaja.</p>
          </header>


          <div className="inputwrapper required">
            <label className="label" htmlFor="firstname" >{t("firstname")}</label>
            <input type="text" name="firstName"  id="firstname" className={customerInfoErrors.firstName ? 'invalid form_input' : 'form_input'}   {...register("firstName",{ required: true })}/>
            <span id="customerInformation_firstname" className='input-info invalid' role="alert">
            {customerInfoErrors.firstName && customerInfoErrors.firstName?.type === "required" && (
              "Etunimi on pakollinen kenttä"
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="lastName" >{t("lastname")}</label>
            <input type="text" name="lastName"  id="lastName" className={customerInfoErrors.lastName ? 'invalid form_input' : 'form_input'}  {...register("lastName",{ required: true })}/>
            <span id="customerInformation_lastname" className='input-info invalid' role="alert">
            {customerInfoErrors.lastName && customerInfoErrors.lastName?.type === "required" && (
              "Sukunimi on pakollinen kenttä"
            )}
            </span>
          </div>

        
          <div className="inputwrapper required">
            <label className="label" htmlFor="streetAddress" data-optional="(Optional)">{t("streetAddress")}</label>
            <input type="text" name="streetAddress"  id="streetAddress" className={customerInfoErrors.streetAddress ? 'invalid form_input' : 'form_input'}  {...register("streetAddress",{ required: true })}/>
            <span id="customerInformation_streetAddress" className='input-info invalid' role="alert">
            {customerInfoErrors.streetAddress && customerInfoErrors.streetAddress?.type === "required" && (
              "Katuosoite on pakollinen kenttä"
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="postalCode" data-optional="(Optional)">{t("postalCode")}</label>
            <input type="text" name="postalCode"  id="postalCode" className={customerInfoErrors.postalCode ? 'invalid form_input' : 'form_input'}  {...register("postalCode",{ required: true })}/>
            <span id="customerInformation_postalCode" className='input-info invalid' role="alert">
            {customerInfoErrors.postalCode && customerInfoErrors.postalCode?.type === "required" && (
              "Postinumero on pakollinen kenttä"
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="city" data-optional="(Optional)">{t("city")}</label>
            <input type="text" name="city"  id="city" className={customerInfoErrors.city ? 'invalid form_input' : 'form_input'}  {...register("city",{ required: true })}/>
            <span id="customerInformation_city" className='input-info invalid' role="alert">
            {customerInfoErrors.city && customerInfoErrors.city?.type === "required" && (
              "Postitoimipaikka on pakollinen kenttä"
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="country" data-optional="(Optional)">{t("country")}</label>
            <select name="country" defaultValue="FI" id="country" className={customerInfoErrors.country ? 'invalid form_input' : 'form_input'}  {...register("country",{ required: true })}>
              <option value="">Valitse</option>
              <option value="FI">Suomi / Finland</option>
            </select>
            <span id="customerInformation_country" className='input-info invalid' role="alert">
              {customerInfoErrors.country && customerInfoErrors.country?.type === "required" && (
                "Maa on pakollinen kenttä"
              )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="phonenumber" data-optional="(Optional)">{t("phonenumber")}</label>
            <input type="text" name="phonenumber"  id="phonenumber" className={customerInfoErrors.phonenumber ? 'invalid form_input' : 'form_input'}  {...register("phonenumber",{ required: true })}/>
            <span id="customerInformation_phonenumber" className='input-info invalid' role="alert">
            {customerInfoErrors.phonenumber && customerInfoErrors.phonenumber?.type === "required" && (
              "Puhelinnumero on pakollinen kenttä"
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="email" data-optional="(Optional)">{t("email")}</label>
            <input type="email" name="email"  id="email" className={customerInfoErrors.email ? 'invalid form_input' : 'form_input'}  {...register("email",{ required: true })}/>
            <span id="customerInformation_email" className='input-info invalid' role="alert">
            {customerInfoErrors.email && customerInfoErrors.email?.type === "required" && (
              "Sähköpostiosoite on pakollinen kenttä"
            )}
            </span>
          </div>


          <div className="inputwrapper">
            <label className="label" htmlFor="comment" data-optional="(Optional)">Tilauksen kommentit</label>
            <textarea type="text" name="comment"  id="comment" className={customerInfoErrors.comment ? 'invalid form_input' : 'form_input'}  {...register("comment",{ required: false })}/>
            <span id="customerInformation_comment" className='input-info invalid' role="alert">
            {customerInfoErrors.comment && customerInfoErrors.comment?.type === "required" && (
              "Komentit on pakollinen kenttä"
            )}
            </span>
          </div>

       


          <div className="inputwrapper">
            <input type="checkbox" defaultChecked={deliverySameAsBillingCheckbox} className="checkbox-input checkbox-larger" id="deliverySameAsBilling" name="deliverySameAsBilling" 
            {...register("deliverySameAsBilling",{ 
              required: false,
              onChange: checkboxHandler,
            })}
            />
            <label htmlFor="deliverySameAsBilling" className="checkbox-label checkbox-label-larger">
            Vastaanottaja on sama kuin tilaaja.
            </label>
	        </div>

            
          <header className="header mt5">
            <h2 className="heading">Vastaanottajan tiedot</h2>
          </header>

          <fieldset disabled={deliveryAddressFormEnable}>

            <div className="inputwrapper required">
              <label className="label" htmlFor="deliveryAddress_firstName" data-optional="(Optional)">{t("firstname")}</label>
              <input type="text" name="deliveryAddress_firstName"  id="deliveryAddress_firstName" className={customerInfoErrors.deliveryAddress_firstName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_firstName",{ required: true })}/>
              <span id="customerInformation_lastname" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_firstName && customerInfoErrors.deliveryAddress_firstName?.type === "required" && (
                "Etunimi on pakollinen kenttä"
              )}
              </span>
            </div>
              
            <div className="inputwrapper required">
              <label className="label" htmlFor="deliveryAddress_lastName" data-optional="(Optional)">{t("lastname")}</label>
              <input type="text" name="deliveryAddress_lastName"  id="deliveryAddress_lastName" className={customerInfoErrors.deliveryAddress_lastName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_lastName",{ required: true })}/>
              <span id="customerInformation_deliveryAddress_lastName" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_lastName && customerInfoErrors.deliveryAddress_lastName?.type === "required" && (
                "Sukunimi on pakollinen kenttä"
              )}
              </span>
            </div>

            <div className="inputwrapper required">
              <label className="label" htmlFor="deliveryAddress_streetAddress" data-optional="(Optional)">{t("streetAddress")}</label>
              <input type="text" name="deliveryAddress_streetAddress"  id="deliveryAddress_streetAddress" className={customerInfoErrors.deliveryAddress_streetAddress ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_streetAddress",{ required: true })}/>
              <span id="customerInformation_deliveryAddress_streetAddress" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_streetAddress && customerInfoErrors.deliveryAddress_streetAddress?.type === "required" && (
                "Katuosoite on pakollinen kenttä"
              )}
              </span>
            </div>

            <div className="inputwrapper required">
              <label className="label" htmlFor="deliveryAddress_postalCode" data-optional="(Optional)">{t("postalCode")}</label>
              <input type="text" name="deliveryAddress_postalCode"  id="deliveryAddress_postalCode" className={customerInfoErrors.deliveryAddress_postalCode ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_postalCode",{ required: true })}/>
              <span id="customerInformation_deliveryAddress_postalCode" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_postalCode && customerInfoErrors.deliveryAddress_postalCode?.type === "required" && (
                "Postinumero on pakollinen kenttä"
              )}
              </span>
            </div>

            <div className="inputwrapper required">
              <label className="label" htmlFor="deliveryAddress_city" data-optional="(Optional)">{t("city")}</label>
              <input type="text" name="deliveryAddress_city"  id="deliveryAddress_city" className={customerInfoErrors.deliveryAddress_city ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_city",{ required: true })}/>
              <span id="customerInformation_deliveryAddress_city" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_city && customerInfoErrors.deliveryAddress_city?.type === "required" && (
                "Postitoimipaikka on pakollinen kenttä"
              )}
              </span>
            </div>

            <div className="inputwrapper required">
            <label className="label" htmlFor="country" data-optional="(Optional)">{t("country")}</label>
              <select name="deliveryAddress_country" defaultValue="FI" id="deliveryAddress_country" className={customerInfoErrors.country ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_country",{ required: true })}>
                <option value="">Valitse</option>
                <option value="FI">Suomi / Finland</option>
              </select>
              <span id="customerInformation_deliveryAddress_country" className='input-info invalid' role="alert">
                {customerInfoErrors.deliveryAddress_country && customerInfoErrors.deliveryAddress_country?.type === "required" && (
                  "Maa on pakollinen kenttä"
                )}
                </span>
            </div>

            <div className="inputwrapper">
              <label className="label" htmlFor="deliveryAddress_phonenumber" data-optional="(Optional)">{t("phonenumber")}</label>
              <input type="text" name="deliveryAddress_phonenumber"  id="deliveryAddress_phonenumber" className={customerInfoErrors.deliveryAddress_phonenumber ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_phonenumber",{ required: false })}/>
              <span id="customerInformation_deliveryAddress_phonenumber" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_phonenumber && customerInfoErrors.deliveryAddress_phonenumber?.type === "required" && (
                "Puhelinnumero on pakollinen kenttä"
              )}
              </span>
            </div>

            <div className="inputwrapper">
              <label className="label" htmlFor="deliveryAddress_email" data-optional="(Optional)">{t("email")}</label>
              <input type="text" name="deliveryAddress_email"  id="deliveryAddress_email" className={customerInfoErrors.deliveryAddress_email ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_email",{ required: false })}/>
              <span id="customerInformation_deliveryAddress_email" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_email && customerInfoErrors.deliveryAddress_email?.type === "required" && (
                "Sähköpostiosoite on pakollinen kenttä"
              )}
              </span>
            </div>

          </fieldset>
        </form>
      </div>

    </div>
  );
};

export default BillingAddressForm;
