const notificationServ = require("../services/notification.service");
const util = require("../utils/util")
module.exports = {
    add : async function(req, res){
        let result = await notificationServ.add(req.body);
        util.sendResponse(result, req, res);
    }, 
    listAll : async function(req, res){
        let result = await notificationServ.listAll(req.body);
        util.sendResponse(result, req, res);
    }, 
    update : async function(req, res){
        let result = await notificationServ.update(req.body);
        util.sendResponse(result, req, res);
    }, 

}