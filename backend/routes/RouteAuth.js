const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("../middleware/multer-config");
const authController = require("../controllers/AuthController");

router.post("/register", multer, authController.register);

router.post("/login", authController.login);

router.get("/refresh", authController.refresh);

router.get("/getMe", authController.getMe);

router.get("/logout", authController.logout);

router.get("/google", authController.google);

router.get("/facebook", authController.facebook);

router.get("/github", authController.github);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  authController.postOAuth
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  authController.postOAuth
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  authController.postOAuth
);

module.exports = router;
