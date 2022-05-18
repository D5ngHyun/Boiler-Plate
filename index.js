const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");

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

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

async function server() {
  try {
    const sv = await mongoose.connect(
      "mongodb+srv://dongs:ehdgus1234@2022-05-18.3egwy.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Success");
  } catch {
    console.log("Error !!!!!!");
  }
}

server();
