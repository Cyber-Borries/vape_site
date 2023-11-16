let express = require("express");
let router = express.Router();
const {
  add,
  deleteProduct,
  view,
  updateQuantity,
} = require("../controller/recipe");

router.put("/recipe/add", add);

router.get("/recipe/view", view);

module.exports = router;
