// require the recipe schema
const recipe = require("../model/recipeSchema");

// Create and Save a new recipe
exports.add = function (req, res) {
  let recipeSchema = new recipe({
    rName: req.body.rName,
    rIngredients: req.body.rIngredients,
  });
  recipeSchema = recipeSchema.save();
  res.send(recipeSchema);
};

//find all recipes
exports.view = function (req, res) {
  recipe.find(function (err, doc) {
    if (err) {
      console.error(err);
      res.send({ message: "An error occurred while retrieving the recipes." });
    } else {
      res.send(doc);
    }
  });
};
