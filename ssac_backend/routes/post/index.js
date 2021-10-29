var express = require("express");
var router = express.Router();

const postController = require("../../controllers/postController");
const authModule = require("../../modules/authModule");

router.post("/", authModule.logIn, postController.createPost);
router.get("/", postController.readAllPost);

router.get("/:id", postController.readDetailPost);
router.put("/:id", authModule.logIn, postController.updatePost);
router.delete("/:id", authModule.logIn, postController.deletePost);
router.put("/:id/comment", authModule.logIn, postController.createComment);
router.put(
	"/:id/comment/:commentId",
	authModule.logIn,
	postController.updateComment
);
module.exports = router;
