import React from 'react';
import '../../common/css/style.css';
import { useSelector } from "react-redux";




const Address = (data) => (

  <>
    <div>{data.firstname} {data.lastname}</div>
  </>
);


const ReviewForm = () => {
  const cart = useSelector((state) => state.cart);
  //const { go } = navigation;

  console.log(cart)

  return (
    <div className="form">
      <h3>Order Review</h3>

      
    
      <h3>billing</h3>
      <Address {...cart.billingAddress} />


      <h3>delivery</h3>
      <Address {...(cart.deliverySameAsBilling ? cart.billingAddress : cart.deliveryAddress)} />
      
      
      <button
        type="button"
        className="w3-button w3-small w3-padding-small w3-border w3-white"
        onClick={() => console.log("no need")}
      >edit</button>
    </div>
  );
};

export default ReviewForm;
