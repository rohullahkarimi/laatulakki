const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
    {
        status: { type: Boolean, default: false, required: true},
        expire:{ type: String, required: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model("Setting", SettingSchema);