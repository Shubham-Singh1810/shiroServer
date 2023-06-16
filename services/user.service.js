const User = require("../models/user.model");
const UserOtp = require("../models/userOtp.model");
const Message = require("../models/message.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { getUserPost } = require("../controller/user.controller");
const Post = require("../models/post.model");
require("dotenv").config();
module.exports = {
  sendOtp: async function (body) {
    let otp = Math.floor(Math.random() * 100000) + 100000;
    let obj = {
      email: body.email,
      password: body.password,
      userName: body.userName,
      otp: otp,
    };
    let result = {};
    let tempUser = await UserOtp.find({ email: body.email });
    if (tempUser.length == 0) {
      try {
        result.data = await new UserOtp(obj).save();
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "hittheshubham1810@gmail.com", // generated ethereal user
            pass: "eqauulfefeodhxel", // generated ethereal password
          },
        });
        let mailOption = {
          from: "hittheshubham1810@gmail.com",
          to: body.email,
          subject: "Email verification for Shiro",
          text: `Your OTP for email verification is ${otp}`,
        };
        transporter.sendMail(mailOption, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
          }
        });
        result.message = "Otp has been sent to the given email address";
      } catch (error) {
        result.err = error;
      }
    } else {
      result.message = "Email is already registered";
    }
    return result;
  },
  verifyOtp: async function (body) {
    let result = {};
    try {
      console.log(body)
      let tempUser = await UserOtp.findOne(body);
      console.log(tempUser, "tempuser")
      if (tempUser) {
        let obj ={
           email : tempUser.email,
           password : tempUser.password,
           userName : tempUser.userName
        }
        result.data = await new User(obj).save();
        result.message = "User verified successfully";
      } else {
        result.message = "Incorrect otp";
      }
    } catch (error) {
      result.message = error;
    }
    return result;
  },
  login: async function (body) {
    let result = {};
    console.log(body)
    try {
      logedUser = await User.find(body);
      console.log(logedUser)
      if (logedUser?.length > 0) {
        result.data = logedUser[0];
        result.message = "You are logged in successfully";
        result.token = await jwt.sign({ logedUser }, process.env.JWT_KEY);
      } else {
        result.message = "Invalid login details";
      }
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  update: async function (body) {
    let result = {};
    console.log("body", body);
    try {
      result.data = await User.findByIdAndUpdate(body._id, { $set: body }, { new: true });
      result.message = "Record Updated Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getUser: async function (id) {
    let result = {};
    console.log(id);
    try {
      result.data = await User.findOne({_id:id});
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  updateProfileImg: async function (body, file_path) {
    let result = {};
    let obj = {
      profileImg: process.env.BASE_URL + file_path,
    };
    try {
      result.data = await User.findByIdAndUpdate(body._id, { $set: obj }, { new: true });
      result.message = "Record Updated Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  sendMessage: async function (body) {
    try {
      let result = await new Message(body).save();
      return {
        result: result,
      };
    } catch (err) {
      return {
        err: err,
      };
    }
  },
  getMessage: async function (req) {
    let { sender_id, reciever_id } = req.body.id;
    console.log("body is ", req.body);
    console.log("sender_id is ", sender_id, "reciever_id is ", reciever_id);
    try {
      let result = await Message.find({ $or: [{ sender_id: sender_id }, { sender_id: reciever_id }] }).sort({
        createdAt: 1,
      });
      return {
        result: result,
      };
    } catch (err) {
      return {
        err: err,
      };
    }
  },
  getAllUsers : async function (req){
    let result ={};
    try {
      result.data = await User.find({})
    } catch (error) {
      result.err = error
    }
    return result
  },
  getUserPost : async function (id){
    let result ={};
    try {
      result.data = await Post.find({userId : id})
    } catch (error) {
      result.err = error
    }
    return result
  }
};
