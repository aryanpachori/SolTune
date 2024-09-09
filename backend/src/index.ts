import express from "express";
import mainRouter from "./router/main";
import spaceRouter from "./router/space";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/main", mainRouter);
app.use("/api/space", spaceRouter);

app.listen(3000, () => {
  console.log("Server running on 3000");
});
