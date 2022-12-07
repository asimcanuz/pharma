var express = require("express");
var router = express.Router();
const refreshTokenController = require("../controllers/refreshToken.controller");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
