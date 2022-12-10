const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title:{ type: Object, required:true, unique:false},
        desc:{ type: Object, required:true, unique:true},
        img:{ type: Array, required: true},
        categories:{ type: Array},
        sizeFilter:{ type: Array},
        size:{ type: Array},
        colorFilter:{ type: Array},
        color:{ type: Array},
        details: { type: Array},
        price:{ type: Number, required: true},
        discount:{ type: Number},
        vatPercentage: {type: Number, default: 24, required: true},
        inStock: {type: Boolean, default: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);