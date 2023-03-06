const PromoCode = require("../models/PromoCode");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newPromoCode = new PromoCode(req.body)

    try{
        const savedPromo = await newPromoCode.save();
        res.status(200).json(savedPromo);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL PROMO CODES
router.get("/", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const query_new = req.query.new;
    const query_category = req.query.category;
    try {
        let promoCodes;
        if(query_new){
            promoCodes = await PromoCode.find().sort({createdAt: -1}).limit(1);
        }else if(query_category){
            promoCodes = await PromoCode.find({
                categories: {
                  $in: [query_category],
                },
            });
        }else{
            promoCodes = await PromoCode.find();
        }
        
        res.status(200).json(promoCodes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;