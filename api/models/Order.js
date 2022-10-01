const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{ type: String, required:false},
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                },
                vatPercentage: {
                    type: Number,
                },
            },
        ],
        billingAddress: { 
            type : {
                firstname: {
                    type: String,
                },
                lastname: {
                    type: String,
                }, 
                streetAddress: {
                    type: String,
                },
                postalCode: {
                    type: String,
                }, 
                city: {
                    type: String,
                }, 
                country: {
                    type: String,
                },
                phone: {
                    type: String,
                },
                email: {
                    type: String,
                }
            },
            required: true
        },
        deliveryAddress: { 
            type : {
                firstname: {
                    type: String,
                },
                lastname: {
                    type: String,
                }, 
                streetAddress: {
                    type: String,
                },
                postalCode: {
                    type: String,
                }, 
                city: {
                    type: String,
                }, 
                country: {
                    type: String,
                },
                phone: {
                    type: String,
                },
                email: {
                    type: String,
                }
            },
            required: false
        },
        deliverySameAsBilling: { type: Boolean, required: true, default: false},
        deliveryMethod: { type: String, default: "delivery"},
        deliveryPrice: { type: Number},
        paid: { type: Boolean, required: true, default: false},
        transactionId: { type: String, default: ""},
        total: { type: Number, required: true},
        message: { type: String},
        status: { type: String, default: "pending"},

    },
    { timestamps: true}
)

module.exports = mongoose.model("Order", OrderSchema);