const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");


router.route("/").post(postController.add);
router.route("/update").put(postController.update);
router.route("/:id").get(postController.getDetails);
// router.route("/update").put(userController.update);

 

module.exports = router