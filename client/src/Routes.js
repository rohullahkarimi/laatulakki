import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";


 
export default (
    <Routes>
      <Route index path="/"/>
      <Route path="/products/:category"  />
      <Route path="/cart"  />
      <Route path="/success"  />
      <Route path="/pay"  />
      <Route path="/terms_and_condition"  />
      <Route path="/registration_statement" />
      <Route path="/change_and_refund"  />
      <Route path="/cart/success" />
      <Route path="/cart/cancel" />
      <Route path="/terms_of_delivery" />
      <Route path="/cap_choice"  />
      <Route path="/cap_usage"  />
      <Route path="/receipt" />
      <Route path="/our_story"  />
    </Routes>
);