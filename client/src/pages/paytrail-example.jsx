
//const CheckoutClient = require('checkout-finland')
//import { CheckoutClient } from "checkout-finland/lib/Checkout";




//import { CheckoutApi } from "../checkout/checkout.ts";
import CheckoutApi, { CheckoutAlgorithm } from '../checkout/checkout.ts'
import axios from 'axios'



const CHECKOUT_MERCHANT_ID = '375917'
const CHECKOUT_SECRET = 'SAIPPUAKAUPPIAS'
const checkoutAPI = new CheckoutApi(CHECKOUT_MERCHANT_ID, CHECKOUT_SECRET, 'sha256')



/*
const merchantId = '375917';
const secret = 'SAIPPUAKAUPPIAS';
const client = new CheckoutClient(merchantId, secret)
const myMode = client.mode; // returns "cors" by default
*/


const payment = {
  stamp: 'unique-identifier-for-merchant',
  reference: '3759170',
  amount: 1525,
  currency: 'EUR',
  language: 'FI',
  items: [
    {
      unitPrice: 1525,
      units: 1,
      vatPercentage: 24,
      productCode: '#1234',
      deliveryDate: '2018-09-01'
    }
  ],
  customer: {
    email: 'test.customer@example.com'
  },
  redirectUrls: {
    success: 'https://ecom.example.com/cart/success',
    cancel: 'https://ecom.example.com/cart/cancel'
  }
};



/*

var CheckoutApi = require('../checkout/checkout-api');
// set the merchant authentication and return base url
var checkout = new CheckoutApi({
    merchantId:     '375917',
    merchantSecret: 'SAIPPUAKAUPPIAS',
    baseUrl:        'https://example.com'
  });

*/



const calculateHmac = async () => {
  // Magic values from:
  // https://checkoutfinland.github.io/psp-api/#/examples?id=hmac-calculation-node-js
  const signature = '3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6'
  const headers = {
    'checkout-account': '375917',
    'checkout-algorithm': 'sha256',
    'checkout-method': 'POST',
    'checkout-nonce': '564635208570151',
    'checkout-timestamp': '2018-07-06T10:01:31.904Z'
  }
  const body = JSON.stringify({
    stamp: 'unique-identifier-for-merchant',
    reference: '3759170',
    amount: 1525,
    currency: 'EUR',
    language: 'FI',
    items: [
      {
        unitPrice: 1525,
        units: 1,
        vatPercentage: 24,
        productCode: '#1234',
        deliveryDate: '2018-09-01'
      }
    ],
    customer: {
      email: 'test.customer@example.com'
    },
    redirectUrls: {
      success: 'https://ecom.example.com/cart/success',
      cancel: 'https://ecom.example.com/cart/cancel'
    }
  })

  console.log(CheckoutApi.calcMac('SAIPPUAKAUPPIAS', 'sha256', headers, body)).toEqual(signature)
}


const CreatePayment = async () => {
  // calcualte hmac
  //const calculateHmacResponse = await checkoutAPI.calculateHmac()
  //console.log(calculateHmacResponse)

  const great = await checkoutAPI.createPayment(payment)
  console.log(great)
  //const data = await client.getPayment(transactionId)


  //const calculateHmacResponse = await calculateHmac()
  //console.log(calculateHmacResponse)
  
  //console.log(data)
}



const Paytrail = () => {
  return (
    <div>
      <button onClick={CreatePayment}>test</button>
    </div>
  )
}

export default Paytrail