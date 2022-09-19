import React from 'react';
import '../../css/styles.css';
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
      <div className="form">
        <form namee="customerInformation" onSubmit={handleSubmit(handleCustomerInformationSubmit)}>
          <h3>Billing Address</h3>

       
          <div>
            <span>Etunimi</span>
            <input type="text" name="firstName"  id="firstName" className={customerInfoErrors.firstName ? 'invalid' : ''}   {...register("firstName",{ required: true })}/>
            <div id="customerInformation_etunimi" className='formErrors'>
            {customerInfoErrors.firstName && customerInfoErrors.firstName?.type === "required" && (
              "Etunimi on pakollinen kenttä"
            )}
            </div>
          </div>

          <div>
            <span>Lastname</span>
            <input type="text" name="lastName"  id="lastName" className={customerInfoErrors.lastName ? 'invalid' : ''}  {...register("lastName",{ required: true })}/>
            <div id="customerInformation_etunimi" className='formErrors'>
            {customerInfoErrors.lastName && customerInfoErrors.lastName?.type === "required" && (
              "Sukunimi on pakollinen kenttä"
            )}
            </div>
          </div>

          <div>
            <span>deliverySameAsBilling</span>
            <input type="checkbox" defaultChecked={deliverySameAsBillingCheckbox} name="deliverySameAsBilling"  id="deliverySameAsBilling" className={customerInfoErrors.lastName ? 'invalid' : ''}   
            {...register("deliverySameAsBilling",{ 
              required: false,
              onChange: checkboxHandler,
            })}/>
            <div id="customerInformation_deliverySameAsBilling" className='formErrors'>
            {customerInfoErrors.deliverySameAsBilling && customerInfoErrors.deliverySameAsBilling?.type === "required" && (
              "Checkbox on pakollinen kenttä"
            )}
            </div>
          </div>

          <fieldset disabled={deliveryAddressFormEnable}>
            <div>
              <span>Etunimi</span>
              <input type="text" name="deliveryAddress_firstName"  id="deliveryAddress_firstName" className={customerInfoErrors.deliveryAddress_firstName ? 'invalid' : ''}   {...register("deliveryAddress_firstName",{ required: true })}/>
              <div id="customerInformation_deliveryAddress_firstName" className='formErrors'>
              {customerInfoErrors.deliveryAddress_firstName && customerInfoErrors.deliveryAddress_firstName?.type === "required" && (
                "delivery_firstName on pakollinen kenttä"
              )}
              </div>
            </div>

            <div>
              <span>Sukunimi</span>
              <input type="text" name="deliveryAddress_lastName"  id="deliveryAddress_lastName" className={customerInfoErrors.deliveryAddress_lastName ? 'invalid' : ''}   {...register("deliveryAddress_lastName",{ required: true })}/>
              <div id="customerInformation_deliveryAddress_lastName" className='formErrors'>
              {customerInfoErrors.deliveryAddress_lastName && customerInfoErrors.deliveryAddress_lastName?.type === "required" && (
                "delivery_lastName on pakollinen kenttä"
              )}
              </div>
            </div>
          </fieldset>

          

          <button type="submit">Tallenna</button>
        </form>
      </div>

    </div>
  );
};

export default BillingAddressForm;
