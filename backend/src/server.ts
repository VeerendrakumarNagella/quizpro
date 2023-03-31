import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import quetions from "./questions.json";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/getquestions", (req, res) => {
  res.send(quetions);
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
