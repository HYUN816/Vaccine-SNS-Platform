var express = require("express");
var router = express.Router();
const authController = require("../../controllers/authController");
const authModule = require("../../modules/authModule");
const upload = require("../../modules/awsUpload");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/profile", authModule.logIn, authController.getProfile);
router.post("/profileimage", upload.single("img"), authController.uploadImage);

router.delete("/withdrawal", authModule.logIn, authController.withdrawal);
router.put("/profile", authModule.logIn, authController.updateProfile);

module.exports = router;
