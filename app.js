require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;

const path = require("path");
const express = require("express");
const errorsHandler = require(path.join(
  __dirname,
  "middlewares",
  "errorsHandler.js"
));
const pageNotFound = require(path.join(
  __dirname,
  "middlewares",
  "pageNotFound.js"
));
const app = express();
const postRouter = require(path.join(__dirname, "routers", "posts.js"));

app.use(express.json());
app.use(express.static("public"));

app.use("/posts", postRouter);

app.use(errorsHandler);
app.use(pageNotFound);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(port, () => {
  console.log(`Server Listening On: ${host}:${port}`);
});
