
//const CheckoutClient = require('checkout-finland')
import { CheckoutClient } from "checkout-finland/lib/Checkout";
//const proxy = require('http-proxy-middleware');
//const CheckoutClient = require('checkout-finland/lib/Checkout')
//const cors = require('cors')

//CheckoutClient.use(cors())

const merchantId = '375917';
const secret = 'SAIPPUAKAUPPIAS';
const client = new CheckoutClient(merchantId, secret)



const payment = 
{
  "stamp": "d2568f2a-e4c6-40ba-a7cd-d573382ce548",
  "reference": "9187445",
  "amount": 1590,
  "currency": "EUR",
  "language": "FI",
  "items": [
    {
      "unitPrice": 1590,
      "units": 1,
      "vatPercentage": 24,
      "productCode": "#927502759"
    }
  ],
  "customer": {
    "email": "erja.esimerkki@example.org"
  },
  "redirectUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  },
  "callbackUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  }
}



/*

var CheckoutApi = require('../checkout/checkout-api');
// set the merchant authentication and return base url
var checkout = new CheckoutApi({
    merchantId:     '375917',
    merchantSecret: 'SAIPPUAKAUPPIAS',
    baseUrl:        'https://example.com'
  });

*/







const CreatePayment = async () => {
  const { transactionId } = await client.createPayment(payment)
  const data = await client.getPayment(transactionId)
  console.log(data)
}



const Paytrail = () => {
  return (
    <div>
      <button onClick={CreatePayment}>test</button>
    </div>
  )
}

export default Paytrail