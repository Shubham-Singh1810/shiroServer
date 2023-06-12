module.exports = {
    sendOtp : async function(body){
        let result ={}
        try {
            result.data = body
        } catch (error) {
            result.err = error
        }
        return result
    }
}