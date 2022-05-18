const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

app.get("/", (req, res) => res.send("Boiler Plate"));

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
