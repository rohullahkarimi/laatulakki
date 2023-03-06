const config =  require('./config.js');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
//const stripeRoute = require("./routes/stripe");
const paytrailRoute = require("./routes/paytrail");
const sendMail = require("./routes/sendMail");
const promoRoute =  require("./routes/promoCode");
const cors = require("cors");

console.log(`NODE_ENV=${config.NODE_ENV}`);
console.log("api starts");

mongoose
.connect(config.MONGO_URL)
.then(()=>console.log("DB connection is successful"))
.catch((err)=>{
    console.log(err);
});

app.get("/api/test", ()=>{
    console.log("test is successful");
});


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
//app.use("/api/checkout", stripeRoute);
app.use("/api/checkout", paytrailRoute);
app.use("/api/sendMail", sendMail);
app.use("/api/promocodes", promoRoute);

app.listen((config.PORT), () => {
    console.log("backend server is running!");
});