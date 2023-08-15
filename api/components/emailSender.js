const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")
const axios = require("axios");
const mongoose = require("mongoose");

module.exports = function() { 
    
    this.getOrderData =  async function(orderId){
        try{
          const res = await axios.get(process.env.MAIN_API_URL+"/orders/getOrder/HDcSmyZpaWqR/find/"+orderId);
          return res.data;
        }catch(err){
          console.log(err);
        }
    }

    this.sendErrorToAdmin = function(errorMessage) {
        let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
        });
    
        // HTML TEMPLATE
        const filePath = path.join(__dirname, '../emails/error.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);

        // data for email
        const replacements = {
            errorMessage: errorMessage,
        }

        // get data 
        const htmlToSend = template(replacements);

        // mail options
        let mailOptions = {
            from: "laatulakki@gmail.com",
            to: ["laatulakki@gmail.com", "rohistech@gmail.com"], 
            subject: "Error in payment",
            html: htmlToSend,
        };
    
        // Send email
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log(err);
            }else{
                console.log("error sent to admin!")
            }
        });
    }
    
    // next function
    this.sendOrderEmail = function(orderId){
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
      
          if(response.emailSent === true){
            return console.log("Email already has been sent.")
          }
      
          // make a new copy of product object, to sum the price in total
          const productsArray = response.products.map(item => {
      
            // if product has discount
            var unitPrice;
            if(item.discount){
                var afterDiscountPrice = item.price - (item.price * (item.discount / 100)).toFixed(2);
                unitPrice = afterDiscountPrice;
            }else{
                unitPrice = item.price.toFixed(2);
            }
      
            var productPriceTax = (unitPrice / 1.24).toFixed(2);
            var productPriceTaxLess = (unitPrice - productPriceTax).toFixed(2);
      
            const productObject = {
              ...item, 
              unitPrice: unitPrice,
              priceInTotal : (unitPrice * item.quantity).toFixed(2),
              tax: productPriceTax,
              taxLess: productPriceTaxLess,
      
              // other options 
              customizedProduct: item.customizedProduct,
              badge: item.customizationOptions?.badge,
              cordColor: item.customizationOptions?.cordColor,
              roundRibbonColor: item.customizationOptions?.roundRibbonColor,
              // embroidery 
              embroideryTextFrontLeft: item.customizationOptions?.embroidery?.embroideryTextFront?.left,
              embroideryTextFrontRight: item.customizationOptions?.embroidery?.embroideryTextFront?.right,
              embroideryTextBack: item.customizationOptions?.embroidery?.embroideryTextBack,
              embroideryTextColor: item.customizationOptions?.embroidery?.embroideryTextColor,
              embroideryFont: item.customizationOptions?.embroidery?.embroideryFont,
      
              // all options prices
              badge_price: item.customizationPrices?.badge,
              cordColor_price:  item.customizationPrices?.cordColor,
              roundRibbonColor_price:  item.customizationPrices?.roundRibbonColor,
              embroideryTextFront_price: item.customizationPrices?.embroideryTextFront,
              embroideryTextBack_price: item.customizationPrices?.embroideryTextBack,
      
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
            orderId: response.shortId,
            billingAddress: response.billingAddress,
            deliveryAddress: response.deliverySameAsBilling ? response.billingAddress : response.deliveryAddress,
            message: response.message,
            products: productsArray,
      
            receiptLink: receiptLink,
            
            delivery_tax: delivery_tax,
            delivery_taxLess: delivery_taxLess,
            deliveryPrice: response.deliveryPrice.toFixed(2),
      
            addedPromoOrNot: response.promoPercentage > 0 ? true : false,
            promoPercentage: response.promoPercentage,
            promoAmount: response.discountAmount.toFixed(2),
            
            totalPriceIncludeDelivery_taxLess: totalPriceIncludeDelivery_taxLess,
            totalPriceIncludeDelivery_tax: totalPriceIncludeDelivery_tax,
            totalPriceIncludeDelivery: response.promoPercentage === 100 ? 0.00 : totalPriceIncludeDelivery
          }
      
          // get data 
          const htmlToSend = template(replacements);
      
          // mail options
          let mailOptions = {
            from: "laatulakki@gmail.com",
            to: [response.billingAddress.email, "laatulakki@gmail.com"], // , "najibullahahmad69@gmail.com"
            subject: "Kiitos tilauksesta #"+ response.shortId,
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

    this.handleOrderPaid =  async function(orderId){
        mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>{
          const Order = require("../models/Order");
          const filter = { _id: orderId };
          Order.findByIdAndUpdate(filter,
          {
            "emailSent": true, 
            "paid": true,
          }, 
          function(err, result){
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
}