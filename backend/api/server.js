const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const quetions = require("./questions.json");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/getquestions", (req, res) => {
  res.send(quetions);
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
