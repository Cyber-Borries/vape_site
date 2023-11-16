const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let mongoURL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

const uri = `mongodb+srv://admin:admin@cluster0.niw2vuo.mongodb.net/?retryWrites=true&w=majority`;
// mongodb+srv://${mongoURL}@cluster0.niw2vuo.mongodb.net/?retryWrites=true&w=majority
// "mongodb+srv://admin:admin@cluster0.niw2vuo.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection with db successful");
  })
  .catch((err) => console.log(err));
