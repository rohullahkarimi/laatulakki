import React from 'react';
import '../../css/styles.css';
import { useSelector } from "react-redux";



const ConfirmationForm = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="form">
      <h2>Order Submitted</h2>
      <pre className="pre w3-container w3-light-grey">
        {JSON.stringify(cart, null, 2)}
      </pre>
    </div>
  )
};

export default ConfirmationForm;
