const express = require("express");
const router = express.Router();
const {
  signupController,
  signinController,
  logoutController,
} = require("../controller/auth.controller");

const auth = require("../middleware/auth");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/logout", auth, logoutController);

module.exports = router;
