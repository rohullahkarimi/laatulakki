import React from 'react';
import '../../common/css/style.css';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  saveCustomerInformation } from '../../redux/cartRedux';
import { useEffect } from 'react';
import { useState } from 'react';

const BillingAddressForm = () => {
  const [deliveryAddressFormEnable, setDeliveryAddressFormEnable ] = useState(false)
 
  const cart = useSelector((state) => state.cart);
  const [deliverySameAsBillingCheckbox, setDeliverySameAsBillingCheckbox ] = useState(cart.deliverySameAsBilling)
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, watch, setValue, getValues, formState: { errors: customerInfoErrors } } = useForm();
  
 

  const handleCustomerInformationSubmit = (data) => {
    console.log(data)
    dispatch(saveCustomerInformation(data));
  }
  console.log(customerInfoErrors)
  console.log(cart)

  useEffect(() => {
    let defaultValues = {};
    // billingAddress
    defaultValues.firstName = cart.billingAddress.firstname;
    defaultValues.lastName = cart.billingAddress.lastname;

    // deliverySameAsBilling
    //setDeliverySameAsBillingCheckbox(cart.deliverySameAsBilling)

    // deliveryAddress
    defaultValues.deliveryAddress_firstName = cart.deliveryAddress.firstname;
    defaultValues.deliveryAddress_lastName = cart.deliveryAddress.lastname;
    
    reset({ ...defaultValues });
  }, [cart, reset]);

  const checkboxHandler = (e) => {
    console.log(e)
    
    if (e.target.type === 'checkbox' && !e.target.checked) {
      setValue('delivery_firstName', '');
      setValue('delivery_firstName', '');
      setDeliveryAddressFormEnable(false);
    } else {
      setValue('deliveryAddress_firstName', getValues('firstName'));
      setValue('deliveryAddress_lastName', getValues('lastName'));
      setDeliveryAddressFormEnable(true);
    }
    
  }
  return (
    <div className='container'>
      <div className="customer_information_form">
        <form name="customerInformation" onSubmit={handleSubmit(handleCustomerInformationSubmit)}>
          
          <header className="header">
            <h2 className="heading">Tilaajan tiedot</h2>
            <p>Täyttää tilaajan tiedot. Voit jätä vastaannottajan tiedot täyttämättä jos tiaalaja on sama kuin vastaannottaja.</p>
          </header>


          <div className="inputwrapper required">
            <label className="label" for="firstname" data-optional="(Optional)">Etunimi</label>
            <input type="text" name="firstName"  id="firstname" className={customerInfoErrors.firstName ? 'invalid form_input' : 'form_input'}   {...register("firstName",{ required: true })}/>
            <span id="customerInformation_firstname" className='input-info invalid' role="alert">
            {customerInfoErrors.firstName && customerInfoErrors.firstName?.type === "required" && (
              "Etunimi on pakollinen kenttä"
            )}
            </span>
          </div>

          <div classname="inputwrapper required">
            <label className="label" for="lastName" data-optional="(Optional)">Sukunimi</label>
            <input type="text" name="lastName"  id="lastName" className={customerInfoErrors.lastName ? 'invalid form_input' : 'form_input'}  {...register("lastName",{ required: true })}/>
            <span id="customerInformation_lastname" className='input-info invalid' role="alert">
            {customerInfoErrors.lastName && customerInfoErrors.lastName?.type === "required" && (
              "Sukunimi on pakollinen kenttä"
            )}
            </span>
          </div>


          <div className="inputwrapper">
            <input type="checkbox" defaultChecked={deliverySameAsBillingCheckbox} className="checkbox-input" id="deliverySameAsBilling" name="deliverySameAsBilling" 
            {...register("deliverySameAsBilling",{ 
              required: false,
              onChange: checkboxHandler,
            })}
            />
            <label for="deliverySameAsBilling" className="checkbox-label">
              Yes, email me my member rewards, special invites, trend alerts and more.
            </label>
	        </div>

            
          <header className="header mt5">
            <h2 className="heading">Vastaannottajan tiedot</h2>
            <p>Jotain.</p>
          </header>

          <fieldset disabled={deliveryAddressFormEnable}>

            <div className="inputwrapper required">
              <label className="label" for="deliveryAddress_firstName" data-optional="(Optional)">Etunimi</label>
              <input type="text" name="deliveryAddress_firstName"  id="deliveryAddress_firstName" className={customerInfoErrors.deliveryAddress_firstName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_firstName",{ required: true })}/>
              <span id="customerInformation_lastname" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_firstName && customerInfoErrors.deliveryAddress_firstName?.type === "required" && (
                "Etunimi on pakollinen kenttä"
              )}
              </span>
            </div>
              
            <div className="inputwrapper required">
              <label className="label" for="deliveryAddress_lastName" data-optional="(Optional)">Sukunimi</label>
              <input type="text" name="deliveryAddress_lastName"  id="deliveryAddress_lastName" className={customerInfoErrors.deliveryAddress_lastName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_lastName",{ required: true })}/>
              <span id="customerInformation_deliveryAddress_lastName" className='input-info invalid' role="alert">
              {customerInfoErrors.deliveryAddress_lastName && customerInfoErrors.deliveryAddress_lastName?.type === "required" && (
                "Sukunimi on pakollinen kenttä"
              )}
              </span>
            </div>

          </fieldset>
          <button className="form_button" type="submit">Tallenna</button>
        </form>
      </div>

    </div>
  );
};

export default BillingAddressForm;
