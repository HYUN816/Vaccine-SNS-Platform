var express = require("express");
var router = express.Router();

const postController = require("../../controllers/postController");
const authModule = require("../../modules/authModule");

router.post("/", authModule.loggedIn, postController.createPost);
router.get("/", postController.readAllPost);

router.get("/:id", postController.readDetailPost);
router.put("/:id", authModule.loggedIn, postController.updatePost);
router.delete("/:id", authModule.loggedIn, postController.deletePost);
router.put("/:id/comment", authModule.loggedIn, postController.createComment);
module.exports = router;
