const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema(
    {
        code: { type: String, required: true},
        discountPercentage: { type: Number, required: true},
        expire:{ type: String, required: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model("PromoCode", PromoCodeSchema);