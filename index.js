const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Boiler Plate"));
app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false }, err);
    }

    return res.status(200).json({ success: true });
  });
});
app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findeOne({ email: req.body.email }, (err, user) => {
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
    });
  });

  // 비밀번호까지 맞다면 토큰 생성.
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
