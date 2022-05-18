const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },

  email: {
    type: String,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    minLengh: 5,
  },

  lastName: {
    type: String,
    maxLength: 50,
  },

  role: {
    type: Number,
    default: 0,
  },

  image: String,
  token: String,
  tokenExp: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
