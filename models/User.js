const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

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
    minLength: 5,
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

userSchema.pre("save", function (next) {
  const user = this;

  // 비밀번호를 암호화
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    if (user.isModified("password")) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);

        user.password = hash;

        next();
      });
    } else {
      next();
    }
  });
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword = 123456 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  // jsonWebToken을 사용해서 토큰 생성하기

  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
