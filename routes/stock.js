let express = require("express");
let router = express.Router();
const {
  addStock,
  viewStock,
  deleteStockItem,
} = require("../controller/userStock");
// const auth = require("../middlewares/authentication");

// router.use(auth);

router.get("/stock/view", viewStock);

router.put("/stock/add", addStock);

router.put("/stock/delete", deleteStockItem);

// router.post("/stock/add", addStock);

// router.post("/stock/update", stock);

// router.post("/recipe/update", updateQuantity);

module.exports = router;
