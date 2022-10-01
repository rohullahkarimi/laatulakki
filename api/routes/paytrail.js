const {CheckoutClient} = require('checkout-finland/lib/Checkout');
const CHECKOUT_MERCHANT_ID = '375917'
const CHECKOUT_SECRET = 'SAIPPUAKAUPPIAS'
const client = new CheckoutClient(CHECKOUT_MERCHANT_ID, CHECKOUT_SECRET)


const router = require("express").Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const payment = {
    stamp: new Date().toISOString(),
    reference: '37594435435170',
    amount: 1525,
    currency: 'EUR',
    language: 'FI',
    items: [
      {
        unitPrice: 1525,
        units: 1,
        vatPercentage: 24,
        productCode: '#1234',
        //deliveryDate: '2018-09-01'
      }
    ],
    customer: {
      email: 'test.custdomer@example.com'
    },
    redirectUrls: {
      success: 'https://ecom.example.com/cart/success',
      cancel: 'https://ecom.example.com/cart/cancel'
    }
  };

  console.log(req)
  try {
    const { transactionId } = await client.createPayment(payment)
    const paymentUrl = "https://pay.paytrail.com/pay/"+transactionId;
      res.status(200).json(paymentUrl);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;