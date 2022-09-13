var express = require("express");
var router = express.Router();
const { index } = require("./controller");

const { isLogin } = require("../middleware/auth");
router.use(isLogin);
/* GET home page. */
router.get("/", index);

module.exports = router;
