const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middlewear/auth")
const multer = require("multer");
const imgupload = multer({
    storage:multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "uploads")
        },
        filename:function(req, file, cb){
            cb(null, Date.now()+file.originalname)
        }
    })
}).single("profileImg");
router.route("/sendOtp").post(userController.sendOtp);
router.route("/verifyOtp").post(userController.verifyOtp);
router.route("/login").post(userController.login);
router.route("/update").put(userController.update);
router.route("/message")
                     .post(userController.sendMessage)
                     .get(userController.getMessage);

router.route("/update").put(auth, userController.update);
router.route("/updateProfileImg").put( imgupload,  userController.updateProfileImg);


 

module.exports = router