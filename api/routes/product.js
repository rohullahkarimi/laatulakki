const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const query_new = req.query.new;
    const query_category = req.query.category;
    try {
        let products;
        if(query_new){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(query_category){
            products = await Product.find({
                categories: {
                  $in: [query_category],
                },
            });
        }else{
            products = await Product.find();
        }
        
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;