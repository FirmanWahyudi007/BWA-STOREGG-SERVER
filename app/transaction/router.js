var express = require("express");
var router = express.Router();
const { index, actionStatus } = require("./controller");
const { isLogin } = require("../middleware/auth");
router.use(isLogin);

router.get("/", index);
router.put("/status/:id", actionStatus);

module.exports = router;
