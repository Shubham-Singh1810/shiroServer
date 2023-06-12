const userServ = require("../services/user.service");
const util = require("../utils/util")
module.exports = {
    sendOtp : async function(req, res){
        let result = await userServ.sendOtp(req.body);
        util.sendResponse(result, req, res);
    },
    verifyOtp : async function(req, res){
        let result = await userServ.verifyOtp(req.body);
        util.sendResponse(result, req, res);
    },
    login : async function(req, res){
        let result = await userServ.login(req.body);
        util.sendResponse(result, req, res);
    },
    update : async function(req, res){
        let result = await userServ.update(req.body);
        util.sendResponse(result, req, res);
    }
}