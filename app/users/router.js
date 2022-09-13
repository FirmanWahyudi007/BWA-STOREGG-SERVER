var express = require("express");
var router = express.Router();
const { viewSignin, actionSignin, actionSignup, actionLogout } = require("./controller");

router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/tes", actionSignup);
router.get("/logout", actionLogout);

module.exports = router;
