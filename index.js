const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const user = require("./routes/user.route");
const post = require("./routes/post.route");
const notification = require("./routes/notification.route");
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

// connecting with database
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shubham1810:mKQjrvgOyLBF5vG4@cluster0.5bhod07.mongodb.net/shiro?retryWrites=true&w=majority"
).then(()=>{
    console.warn("db connection done")
});
app.use("/user", user);
app.use("/post", post);
app.use("/notification",notification);
const PORT = process.env.PORT || 3005;

app.listen(PORT, ()=>{
    console.log(`app is listing at ${PORT}`)
})
