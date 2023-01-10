const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = new mongoose.Schema(
    {   
        firstname:{ type: String, required:true},
        lastname:{ type: String, required:true},
        email:{ type: String, required:true, unique:true},
        password:{ type: String, required: true},
        isAdmin:{
            type: Boolean,
            default: false,
        },
        isVerified:{
            type: Boolean,
            default: false,
        },
        img: { type: String},
    },
    { timestamps: true}
)
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);