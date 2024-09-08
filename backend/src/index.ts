import express from "express";
import mainRouter from "./router/main";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/main", mainRouter);

app.listen(3000, () => {
  console.log("Server running on 3000");
});
