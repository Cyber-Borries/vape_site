const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const recipeSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: uuidv4,
  },
  rName: {
    type: String,
  },
  rIngredients: {
    type: [{ name: String, quantity: Number }],
  },
});

//make a recipe collection
const recipe = mongoose.model("recipe", recipeSchema);
//export the module
module.exports = recipe;
