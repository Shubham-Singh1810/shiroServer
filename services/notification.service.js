const Notification = require("../models/notification.model")
module.exports = {
  add: async function(body){
    let result = {};
    try {
        result.data = await Notification(body).save();
    } catch (error) {
        result.err = error;
    }
    return result
  },
  listAll: async function(body){
    let result = {};
    console.log(body)
    try {
        result.data = await Notification.find({reciever: body.reciever});
    } catch (error) {
        result.err = error
    }
    return result
  },
  update: async function(body){
    let result = {};
    try {
        result.data = await Notification.findByIdAndUpdate(body._id, { $set: body }, { new: true });
    } catch (error) {
        result.err = error
    }
    return result
  },
};
