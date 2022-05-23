const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Boiler Plate"));
app.get("/api/hello", (req, res) => res.json({ Greeting: "Hello" }));
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  console.log(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // 파라미터를 함수로 전달받는다 = 콜백함수
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호까지 맞다면 토큰 생성.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다.

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  console.log(req);
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

async function server() {
  try {
    const sv = await mongoose.connect(config.MONGO_URI);
    console.log("Success");
  } catch {
    console.log("Error !!!!!!");
  }
}

server();
