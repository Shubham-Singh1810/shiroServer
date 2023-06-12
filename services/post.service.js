const Post = require("../models/post.model")
module.exports = {
  add: async function(body){
    let result = {};
    try {
        result.data = await Post(body).save()
    } catch (error) {
        result.err = error
    }
    return result
  },
  update: async function(body){
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
  }
  
};
