const postServ = require("../services/post.service");
const util = require("../utils/util")
module.exports = {
    add : async function(req, res){
        let result = await postServ.add(req.body, req.file.path);
        util.sendResponse(result, req, res);
    }, 
    listAll : async function(req, res){
        let result = await postServ.listAll(req.body);
        util.sendResponse(result, req, res);
    }, 
    update : async function(req, res){
        let result = await postServ.update(req.body);
        util.sendResponse(result, req, res);
    }, 
    getDetails : async function(req, res){
        let result = await postServ.getDetails(req.params.id);
        util.sendResponse(result, req, res);
    },
    delete: async function(req, res){
        let result = await postServ.delete(req.params.id);
        util.sendResponse(result, req, res);
    }
}