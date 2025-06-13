const express = require("express");
const {
  adminLogin,
  userLogout,
  userLogin,
  forgotPassword,
  resetPassword
} = require("../controllers/userController");
const router = express.Router();
router.use((req, res, next) => {
  req.skipAccountIdMiddleware = true;
  next();
});
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

module.exports = router;
