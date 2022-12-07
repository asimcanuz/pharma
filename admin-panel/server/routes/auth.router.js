var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const authControllers = require("../controllers/auth.controller");
const validateRegister = require("../middleware/validateRegister");
const validateLogin = require("../middleware/validateLogin");
/* GET REQUESTS. */
router.get("/", function (req, res, next) {
  res.json({
    auth: "auth server is running",
  });
});

// POST REQUESTS

//login
router.post("/login", validateLogin.checkData, authControllers.handleLogin);

// register
router.post(
  "/register",
  [validateRegister.checkData, validateRegister.checkDuplicateUsernameOrEmail],
  authControllers.handleRegister
);

router.get("/logout", authControllers.handleLogout);

module.exports = router;
