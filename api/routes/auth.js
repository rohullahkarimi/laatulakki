const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res)=>{
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne(
            {
                email: req.body.email 
            }
        );

      
        //!user &&  res.status(401).end("wrong credentials");

        if (!user) {
            return res.status(401).json({
              message: "email not found."
            });
          
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        //console.log(OriginalPassword, req.body.password  );

        //OriginalPassword !== req.body.password && res.status(401).end("wrong credentials.");

        if (OriginalPassword !== req.body.password) {
            return res.status(400).json({
                message: "wrong password."
            });
        }


        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
   
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;