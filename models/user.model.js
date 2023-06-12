const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
        // profileImg:{
        //     type: String,
        // },
        // userBio:{
        //     type: String,
        // }
    },
    { timestamps: { createdAt: "createdAt" } }
);

let User = mongoose.model("users", userSchema);
module.exports = User;