const dotenv = require("dotenv");
dotenv.config();

let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let port = process.env.SERVER_PORT;
let cors = require("cors");
let logger = require("morgan");
let recipeRouter = require("./routes/recipes");
let userRouter = require("./routes/users");
let stockRouter = require("./routes/stock");

let app = express();

app.use(cors());

//database connnection goes here
require("./db/connection");

//middleware set up
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (request, response) {
  response.send("Hello world");
});

app.use(require("./routes/recipes"));
app.use("/recipe", recipeRouter);

app.use(require("./routes/users"));
app.use("/user", userRouter);

app.use(require("./routes/stock"));
app.use("/stock", stockRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost/${port}`);
});
