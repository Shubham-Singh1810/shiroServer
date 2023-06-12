const userServ = require("../services/user.service");
const util = require("../utils/util")
module.exports = {
    sendOtp : async function(req, res){
        let result = await userServ.sendOtp(req.body);
        util.sendResponse(result, req, res);
    }
}