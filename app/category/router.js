var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actioDelete } = require("./controller");
const { isLogin } = require("../middleware/auth");
router.use(isLogin);
/* GET home page. */

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actioDelete);

module.exports = router;
