const User = require("../model/userSchema");
require("dotenv").config();

//view all stock
exports.viewStock = async (req, res) => {
  console.log("view Stock");
  try {
    const email = "adriaan.bornman1@gmail.com";
    const user = await User.find({ email: email });
    let stock = [];
    user.map((item) => {
      stock.push(item.stock);
    });
    res.status(200).send(stock);
  } catch (err) {
    res.status(500).send("something went wrong");
    console.log(err);
  }
};

//add a stock item
exports.addStock = async (req, res) => {
  console.log("add Stock");
  console.log("req.body", req.body);
  const { stock, email } = req.body;
  User.findOneAndUpdate(
    {
      email: email,
    },
    { $addToSet: { stock: stock } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        res.send(data);
        console.log(data);
      }
    }
  );
};

//remove all instances of stock item
exports.deleteStockItem = (req, res) => {
  const removeStockItem = req.body.removeStockItem;
  const email = "adriaan.bornman1@gmail.com";
  console.log("removeStockItem", removeStockItem);
  console.log("removeStockItem.name", removeStockItem);
  User.findOneAndUpdate(
    { email: email },
    { $pull: { stock: { name: removeStockItem } } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("ERROR", err);
        res.status(500).send({ error: "Unable to delete stock item." });
      } else {
        res.send(data);
      }
    }
  );
};

//update stock item (adding stock)
exports.addStockItem = (req, res) => {
  console.log("add stock");
  const stock = req.body.stockItem;
  const email = "adriaan.bornman1@gmail.com";
  console.log("todo req.body:", todo);
  User.findOneAndUpdate(
    {
      email: email,
    },
    { $pull: { stock: stock } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        res.send(data);
        // console.log(data);
      }
    }
  );
};

//update stock item (mixing recipes)
