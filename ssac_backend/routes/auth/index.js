var express = require("express");
var router = express.Router();
const authController = require("../../controllers/authController");
const authModule = require("../../modules/authModule");
const upload = require("../../modules/awsUpload");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/profileimage", upload.single("img"), authController.uploadImage);

router.delete("/withdrawal", authModule.loggedIn, authController.withdrawal);
router.put("/profile/:id", authModule.loggedIn, authController.updateProfile);

module.exports = router;
