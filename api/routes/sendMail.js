const axios = require("axios");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")
require('dotenv').config()
const router = require("express").Router();
const mongoose = require("mongoose");

// checkout
const {CheckoutClient} = require('checkout-finland/lib/Checkout');
const CHECKOUT_MERCHANT_ID = process.env.PAYTRAIL_MERCHANT_ID
const CHECKOUT_SECRET = process.env.PAYTRAIL_SECRET
const client = new CheckoutClient(CHECKOUT_MERCHANT_ID, CHECKOUT_SECRET)


// HMAC 
router.get("/:id", async (req, res) => {
  let orderId = req.params.id

  // get transaction ID from order details
  try {
    await axios.get(process.env.MAIN_API_URL+"/orders/find/transactionId/"+orderId)
    .then((response) => {
      transactionId = response.data
      
      // TESTI 1 
      //console.log(orderId, transactionId)
  
      getTransactionDetails(orderId, transactionId)
    })
    res.status(200).json({"status": "ok", "emailSent": true, "message": "Email sent"})
  } catch(error) {
    res.status(400).json({"status": "wrong", "emailSent": false, "message": "The payment faild, please contact us!"})
  }
});

async function getTransactionDetails(orderId, transactionId){
  try {
    const data = await client.getPayment(transactionId)
    if(data.status === "ok"){
      // send order emails 
      sendOrderEmail(orderId)
    }else{
      res.status(400).json("The transaction is not valid, try again!")
    }
  }catch(err){
    return(err.message)
  }
}

function sendOrderEmail(orderId){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS
    }
  });

  // HTML TEMPLATE
  const filePath = path.join(__dirname, '../emails/template.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  getOrderData(orderId).then((response) => {
    //console.log(response)

    // TODO::  if email already send, do not send it 
    if(response.emailSent === true){
      return console.log("Email already has been sent.")
    }

    // make a new copy of product object, to sum the price in total
    const productsArray = response.products.map(item => {
      var productPriceTax = (item.price / 1.24).toFixed(2);
      var productPriceTaxLess = (item.price - productPriceTax).toFixed(2);

      const productObject = {
        ...item, 
        priceInTotal : (item.price * item.quantity).toFixed(2),
        tax: productPriceTax,
        taxLess: productPriceTaxLess
      };
      return productObject;
    })

    // delivery 
    var delivery_taxLess = (response.deliveryPrice / 1.24).toFixed(2);
    var delivery_tax = (response.deliveryPrice - delivery_taxLess).toFixed(2);

    // total price
    var totalPriceIncludeDelivery = response.total.toFixed(2);
    var totalPriceIncludeDelivery_taxLess = (totalPriceIncludeDelivery / 1.24).toFixed(2);
    var totalPriceIncludeDelivery_tax = (totalPriceIncludeDelivery - totalPriceIncludeDelivery_taxLess).toFixed(2);

    var receiptHash = response.receiptHash;
    var receiptLink = process.env.MAIN_CLIENT_URL+"/receipt?orderId="+orderId+"_"+receiptHash;

  
    // data for email
    const replacements = {
      billingAddress: response.billingAddress,
      deliveryAddress: response.deliveryAddress, 
      products: productsArray,

      receiptLink: receiptLink,
      
      delivery_tax: delivery_tax,
      delivery_taxLess: delivery_taxLess,
      deliveryPrice: response.deliveryPrice.toFixed(2),
      
      totalPriceIncludeDelivery_taxLess: totalPriceIncludeDelivery_taxLess,
      totalPriceIncludeDelivery_tax: totalPriceIncludeDelivery_tax,
      totalPriceIncludeDelivery: totalPriceIncludeDelivery
    }

    // get data 
    const htmlToSend = template(replacements);

    // mail options
    let mailOptions = {
      from: "laatulakki@gmail.com",
      to: [response.billingAddress.email, "laatulakki@gmail.com"], // , "najibullahahmad69@gmail.com"
      subject: "Kiitos tilauksesta "+ response._id,
      html: htmlToSend,
    };

    // Send email
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return console.log(err);
      }else{
        // set order paid to true 
        handleOrderPaid(orderId)
      }
    });
  });
}

async function handleOrderPaid(orderId){
  mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>{
    const Order = require("../models/Order");
    const filter = { _id: orderId };
    Order.findByIdAndUpdate(filter,{"emailSent": true, "paid": true}, function(err, result){
      if(err){
        console.log(err)
      }
      // else can print something if needed
    })
  })
  .catch((err)=>{
      console.log(err);
  });
}

async function getOrderData(orderId){
  try{
    const res = await axios.get(process.env.MAIN_API_URL+"/orders/getOrder/find/"+orderId);
    return res.data;
  }catch(err){
    console.log(err);
  }
}

module.exports = router;