const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const { Readable } = require('stream');
const csv = require('fast-csv');

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

// GET CUSTOM PRODUCT
router.get("/findCustomProduct/:productId", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
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
                customizedProduct: { $ne: true }, // Exclude customized products
            });
        }else{
            products = await Product.find({ customizedProduct: { $ne: true } }); // Exclude customized products
        }
        
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});



// GET ALL PRODUCTS in CSV format
router.get("/csv", async (req, res) => {
    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename=products.csv');

    try {
        let products;
        products = await Product.find();
     
        // Modify products array to include extracted title and description in "fi" language
        const modifiedProducts = products.map(product => {
            return {
                id: product.id,
                title: product.title[0].fi,
                price: product.price+' EUR',
                link: product.customizedProduct === true ? 'https://www.laatulakki.fi/ylioppilaslakki' :  "https://www.laatulakki.fi/product/"+ product.id,
                additional_image_link: product.img[1]?.original,
                image_link: product.img[0]?.original,
                brand: "LAATULAKKI",
                description: product.desc[0].fi,
                availability: product.visibility ? 'in_stock' : 'out_of_stock',
                condition: 'new',
                google_product_category: 173,
                category: "Naisten vaatteet ja asusteet > Naisten hatut, huivit ja asusteet > Laatulakki, ylioppilaslakki"
            };
        });

        // Create a Readable stream to generate CSV data
        const readableStream = new Readable({ objectMode: true });
        
        // Pipe the stream to the response
        csv.writeToStream(res, modifiedProducts, { headers: true });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;