const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  stock: [
    {
      name: String,
      quantity: Number,
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
  }
  next();
});

//make a collection
const user = mongoose.model("user", userSchema);
//export the module
module.exports = user;
