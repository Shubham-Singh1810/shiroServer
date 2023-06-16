const Post = require("../models/post.model");
require("dotenv").config();
module.exports = {
  add: async function(body, file_path){
    console.log(body.likes)
    let obj ={
      likes : body.likes,
      reportedBy : body.reportedBy,
      comments : body.comments,
      imgUrl : process.env.BASE_URL+file_path,
      caption : body.caption,
      userId : body.userId
    }
    let result = {};
    try {
        result.data = await Post(obj).save();
    } catch (error) {
        result.err = error;
    }
    return result
  },
  listAll: async function(body){
    let result = {};
    try {
        result.data = await Post.find({});
    } catch (error) {
        result.err = error
    }
    return result
  },
  update: async function(body){
    console.log(body)
    let result = {};
    try {
        result.data = await Post.findByIdAndUpdate(body._id, { $set: body }, { new: true });
    } catch (error) {
        result.err = error
    }
    return result
  },
  getDetails: async function(id){
    let result = {}
    try {
        result.data = await Post.findById(id);
    } catch (error) {
        result.err = error
    }
    return result
  },
  delete: async function(id){
    let result = {}
    try {
      result.data = await Post.findByIdAndDelete(id);
      result.message = "Record Deleted Successfully"
    } catch (error) {
        result.err = error
    }
    return result
  }
  
};
