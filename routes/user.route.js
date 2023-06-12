const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");


router.route("/sendOtp").post(userController.sendOtp);
 

module.exports = router