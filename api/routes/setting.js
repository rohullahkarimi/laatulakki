const Setting = require("../models/Setting");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newSetting = new Setting(req.body)

    try{
        const savedPromo = await newSetting.save();
        res.status(200).json(savedPromo);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL Setting 
router.get("/", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const query_new = req.query.new;
    const query_category = req.query.category;
    try {
        let settings;
        if(query_new){
            settings = await Setting.find().sort({createdAt: -1}).limit(1);
        }else if(query_category){
            settings = await Setting.find({
                categories: {
                  $in: [query_category],
                },
            });
        }else{
            settings = await Setting.find();
        }
        
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;