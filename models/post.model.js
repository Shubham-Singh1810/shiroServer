const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {   
        imgUrl: {
            type: String,
        },
        caption: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        likedBy:[{
            type: String,
        }],
        savedBy:[{
            type: String,
        }],
        reportedBy:[{
            type: String,
        }],
        comments:[
            {
                userId: {
                    type: String,
                },
                message:{
                    type: String,
                }, 
                profileImg:{
                    type: String,
                },
                userName:{
                    type: String,
                },  
            }
        ],
    },
    { timestamps: { createdAt: "createdAt" } }
);

let Post = mongoose.model("posts", postSchema);
module.exports = Post;