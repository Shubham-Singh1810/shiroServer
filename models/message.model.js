const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {   
        sender_id: {
            type: String,
        },
        reciever_id: {
            type: String,
        },
        message:{
            type:String,
        },

    },
    { timestamps: { createdAt: "createdAt" } }
);

let User = mongoose.model("message", messageSchema);
module.exports = User;