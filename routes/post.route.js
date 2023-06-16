const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller");
const auth = require("../middlewear/auth");

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
}).single("imgUrl");

router.route("/").post(imgupload,  postController.add);
router.route("/").get( postController.listAll);
router.route("/update").put( postController.update);
router.route("/:id").get( postController.getDetails);
router.route("/:id").delete( postController.delete);

module.exports = router