require("dotenv").config();
const host = "http://" + process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const app = express();

const path = require("path");
const postRouter = require(path.join(__dirname, "router", "posts.js"));

app.use("/posts", postRouter);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(port, () => {
  console.log(`Server Listening On: ${host}:${port}`);
});
