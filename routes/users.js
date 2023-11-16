let express = require("express");
let router = express.Router();
const { register, login, logout } = require("../controller/user");
// const auth = require("../middlewares/authentication");

// router.use(auth);

router.post("/user/register", register);

router.post("/user/login", login);

router.post("/user/logout", logout);

// router.post("/stock/add", addStock);

// router.post("/stock/update", stock);

// router.post("/recipe/update", updateQuantity);

module.exports = router;
