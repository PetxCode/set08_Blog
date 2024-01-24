import express, { Application } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import user from "./router/userRouter";
import blog from "./router/blogRouter";

const app: Application = express();
const port: number = 4499;

app.use(cors());
app.use(express.json());

app.use("/api", user);
app.use("/api", blog);

app.listen(port, () => {
  console.clear();
  console.log("server connected");
  dbConfig();
});
