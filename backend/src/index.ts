import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooks } from "./utils/getBooks";
import { db } from "./db/db";
import { getIndex } from "./utils/getIndex";
import cors from "cors";
import router from "./routes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
db();
app.use(cors());
app.use("/api", router);
app.get("/", async (req: Request, res: Response) => {
  // await getBooks();
  // await getIndex();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
