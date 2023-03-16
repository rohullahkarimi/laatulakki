const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();
const axios = require('axios');
require('dotenv').config()
const mongoose = require("mongoose");
const {CheckoutClient} = require('checkout-finland/lib/Checkout');
const CHECKOUT_MERCHANT_ID = process.env.PAYTRAIL_MERCHANT_ID
const CHECKOUT_SECRET = process.env.PAYTRAIL_SECRET
const client = new CheckoutClient(CHECKOUT_MERCHANT_ID, CHECKOUT_SECRET)
require("../components/emailSender.js")();




// GET ORDER Full data
router.get("/getOrder/HDcSmyZpaWqR/find/:id", async (req, res) => {
    // password: HDcSmyZpaWqR
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE Checkout order transaction ID
router.put("/checkoutOrder/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET Order Transaction ID
router.get("/find/transactionId/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const { transactionId } = order._doc;
        res.status(200).send(transactionId);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE
router.post("/", async (req, res)=>{
    // Cors
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    //console.log(req.body.cart)
    // new order Data
    const newOrder = new Order(req.body.cart);
    var clientLanguage = req.body.language;
    if(clientLanguage === "SE"){
        clientLanguage = "SV"
    }
    if(!clientLanguage){
        clientLanguage = "FI"
    }
   

    // test
    //console.log(newOrder)

    try{
        const savedOrder = await newOrder.save();
        var savedOrderId = savedOrder._id.valueOf()
        
        // save transaction ID
        saveTransactionId(savedOrderId, savedOrder, clientLanguage)
        //console.log(savedOrderId, savedOrder)
        res.status(200).send(savedOrder);
        
    }catch(err){
        res.status(500).json(err);
    }
  
});

// save transaction ID
const saveTransactionId = async (getSavedOrderId, savedOrder, clientLanguage) => {

    const orderId = getSavedOrderId
    const paytrailProduct = []

    savedOrder.products?.map((key, index) =>{
        //console.log(productPrice)


        // if product has discound 
        var productPrice = parseFloat(key.price).toFixed(2);
        var unitPrice;
        if(key.discount){
            var afterDiscountPrice = productPrice - (productPrice * (key.discount / 100)).toFixed(2);
            unitPrice = parseInt((afterDiscountPrice * 100).toFixed(0));
        }else if(savedOrder.promoPercentage > 0){
            var afterDiscountPrice = productPrice - (productPrice * (savedOrder.promoPercentage / 100)).toFixed(2);
            unitPrice = parseInt((afterDiscountPrice * 100).toFixed(0));
        }else{
            unitPrice = parseInt((productPrice * 100).toFixed(0));
        }

    
        
        const paytrailItem = {
            unitPrice: unitPrice, // number
            units: key.quantity,     // number
            vatPercentage: key.vatPercentage, // number
            productCode: key.productId, // string 
        }
        paytrailProduct.push(paytrailItem)
    });

    var totalPriceIncludeDelivery = (savedOrder.deliveryPrice - savedOrder.discountAmount + savedOrder.total).toFixed(2);

    // for delivery 
    if(savedOrder.deliveryPrice !== 0){
        const paytrailItem = {
            unitPrice: parseInt((savedOrder.deliveryPrice * 100).toFixed(0)), // number
            units: 1,     // number
            vatPercentage: 24, // number
            productCode: "123456789", // string 
        }
        paytrailProduct.push(paytrailItem)
    }

    // Payment Data
    const payment = {
        stamp: new Date().toISOString(),
        reference: orderId,
        amount: parseInt((totalPriceIncludeDelivery * 100).toFixed(0)), 
        currency: 'EUR',
        language: clientLanguage,
        items: paytrailProduct,
        customer: {
            firstName: savedOrder.billingAddress.firstname,
            lastName: savedOrder.billingAddress.lastname,
            phone: savedOrder.billingAddress.phonenumber,
            email: savedOrder.billingAddress.email
        },
        deliveryAddress: {
            streetAddress: savedOrder.deliveryAddress.streetAddress,
            postalCode: savedOrder.deliveryAddress.postalCode,
            city: savedOrder.deliveryAddress.city,
            country: savedOrder.billingAddress.country
        },
        redirectUrls: {
            success: process.env.MAIN_CLIENT_URL+'/cart/success',
            cancel: process.env.MAIN_CLIENT_URL+'/cart/cancel'
        }
    };


    // TEST: 1
    console.log(payment)
    console.log(savedOrder)


    // Get transaction ID
    try {
        const createPayment = await client.createPayment(payment);
        //console.log(createPayment);
        
        const {transactionId} = createPayment;
        const transactionIdData ={
            "transactionId": transactionId
        }

        // TEST: 2
        //console.log(transactionIdData)

        // update order total, that include delivery price
        saveDeliveryPrice(orderId, totalPriceIncludeDelivery)

        // Save transaction ID
        try {
          await axios.put(process.env.MAIN_API_URL+"/orders/checkoutOrder/"+orderId,  transactionIdData);
        } catch(error) {
          sendErrorToAdmin(error)
          res.status(500).json(error);
        }
    }catch(err){
        sendErrorToAdmin(err.message)
        return err.message;
    }
};


// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});


async function saveDeliveryPrice(orderId, totalPriceIncludeDelivery){
    mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
      const Order = require("../models/Order");
      const filter = { _id: orderId };
      Order.findByIdAndUpdate(filter,{"total": totalPriceIncludeDelivery}, function(err, result){
        if(err){
          console.log(err)
        }
      })
    })
    .catch((err)=>{
        console.log(err);
    });
}


// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth },  ...( productId && {
                products: {$elemMatch:{productId:productId}}
            }) } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"},
                },
            },
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;