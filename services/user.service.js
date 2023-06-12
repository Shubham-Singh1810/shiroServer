const User = require("../models/user.model")
module.exports = {
    sendOtp : async function(body){
        let result ={}
        try {
            result.data = body
        } catch (error) {
            result.err = error
        }
        return result
    },
    verifyOtp : async function(body){
        console.log(body)
        let result ={}
        try {
            result.data = await new  User(body).save()
        } catch (error) {
            result.err = error
        }
        return result
    },
    login : async function(body){
        let result ={}
        try {
            result.data = "login"
        } catch (error) {
            result.err = error
        }
        return result
    },
    update : async function(body){
        let result ={}
        try {
            result.data = "update"
        } catch (error) {
            result.err = error
        }
        return result
    }
}