const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {   
        message: {
            type: String,
        },
        reciever: {
            type: String,
        },
        senderId: {
            type: String,
        },
        senderProfileImg: {
            type: String,
        },
        read: {
            type: Boolean,
            // default: false,
        },
    },
    { timestamps: { createdAt: "createdAt" } }
);

let Notification = mongoose.model("notifications", notificationSchema);
module.exports = Notification;