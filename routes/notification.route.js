const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notification.controller");
const auth = require("../middlewear/auth");

router.route("/").post( auth,  notificationController.add);
router.route("/").put(auth, notificationController.listAll);
router.route("/update").put(auth, notificationController.update);

module.exports = router