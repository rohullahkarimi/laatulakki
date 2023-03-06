const mongoose = require("mongoose");
const randToken = require("rand-token");
const ShortUniqueId = require('short-unique-id');
const shortId = new ShortUniqueId({ length: 5, dictionary: 'number' });
const d = new Date();
const ms = d.valueOf();

const OrderSchema = new mongoose.Schema(
    {
        userId:{ type: String, required:false},
        shortId: { type: String, default: shortId()+"-"+ms, required: true},
        products: [
            {
                productId: {
                    type: String,
                },
                title: {
                    type: String,
                },
                img: {
                    type: String,
                },
                color: {
                    type: String,
                },
                size: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                },
                discount: {
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
                phonenumber: {
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
                phonenumber: {
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
        emailSent: { type: Boolean, required: true, default: false},
        reminderEmailSent: { type: Boolean, default: false},
        transactionId: { type: String, default: ""},
        promoCode: { type: String, default: ""},
        promoPercentage: { type: Number, required: true},
        discountAmount: { type: Number, required: true},
        total: { type: Number, required: true},
        message: { type: String},
        status: { type: String, default: "created"},
        receiptHash: {
            type: String,
            default: function() {
                return randToken.generate(64);
            }
        },
    },
    { timestamps: true}
)

module.exports = mongoose.model("Order", OrderSchema);