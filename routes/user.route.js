const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");


router.route("/sendOtp").post(userController.sendOtp);
router.route("/verifyOtp").post(userController.verifyOtp);
router.route("/login").post(userController.login);
router.route("/update").put(userController.update);
router.route("/message")
                     .post(userController.sendMessage)
                     .get(userController.getMessage);


 

module.exports = router