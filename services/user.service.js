const User = require("../models/user.model");
const UserOtp = require("../models/userOtp.model");
const Message = require("../models/message.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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
    let tempUser = await UserOtp.find({ email: body.email, otp: body.otp });
    if (tempUser.length > 0) {
      let obj = {
        email: tempUser[0].email,
        password: tempUser[0].password,
        userName: tempUser[0].userName,
      };
      try {
        result.data = await new User(obj).save();
      } catch (error) {
        result.err = error;
      }
    } else {
      result.message = "Wrong OTP";
    }
    return result;
  },
  login: async function (body) {
    let result = {};
    try {
      let logedUser = await User.find({
        email: body.email,
        password: body.password,
      });
      if (logedUser.length > 0) {
        result.data = logedUser[0];
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
    console.log("body", body)
    try {
      result.data = await User.findByIdAndUpdate(
        body._id,
        { $set: body },
        { new: true }
      );

      result.data = await User.findByIdAndUpdate(body._id, { $set: body }, { new: true });
      result.message = "Record Updated Successfully"
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  updateProfileImg: async function (body, file_path) {
    let result = {};
    let obj ={
      profileImg : process.env.BASE_URL+file_path
    }
    try {
      result.data = await User.findByIdAndUpdate(body._id, { $set: obj }, { new: true });
      result.message = "Record Updated Successfully"
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  sendMessage: async function (body) {
    try {
      let result = await new Message(body).save();
      return {
        result: result
      }
    } catch (err) {
      return {
        err: err,
      };
    }
  },
  getMessage:async function(req){
    let { sender_id,reciever_id} = req.body.id;
    console.log("body is ",req.body)
    console.log("sender_id is " ,sender_id,"reciever_id is ", reciever_id)
    try{
      let result = await Message.find({ $or : [
        {sender_id : sender_id},
        {sender_id : reciever_id}
      ]}).sort({createdAt : 1});
      return {
        result : result
      }
    }
    catch(err){
      return{
        err: err
      }
    }
    
  }
};
