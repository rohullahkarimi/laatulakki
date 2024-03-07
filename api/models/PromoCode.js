const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema(
    {
        code: { type: String, required: true},
        discountPercentage: { type: Number, required: true},
        allowOnTopOfDiscount: { type: Boolean, required: false, default: false},
        oneTimeUse: {type: Boolean, default: false},
        expire:{ type: String, required: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model("PromoCode", PromoCodeSchema);