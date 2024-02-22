const express  = require("express");
const router = express.Router();

//IMPORT CONTROLLER

const {createPost,getAllPost} = require("../controllers/PostsController");
const {likePost,unlike} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");


//MAPPING CREATE

router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlike);
router.post("/comments/create",createComment);




//EXPORT
module.exports = router;