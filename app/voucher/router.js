var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actioDelete, actionStatus } = require("./controller");
const multer = require("multer");
const os = require("os");
const { isLogin } = require("../middleware/auth");
router.use(isLogin);

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", multer({ dest: os.tmpdir() }).single("image"), actionEdit);
router.delete("/delete/:id", actioDelete);
router.put("/status/:id", actionStatus);

module.exports = router;
