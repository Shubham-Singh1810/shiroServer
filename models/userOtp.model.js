const mongoose = require("mongoose");

const userOtpSchema = mongoose.Schema(
    {   
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        userName: {
            type: String,
        },
        otp:{
            type : String
        }
    },
    { timestamps: { createdAt: "createdAt" } }
);

let UserOtp = mongoose.model("userOtps", userOtpSchema);
module.exports = UserOtp;