import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooks } from "./utils/getBooks";
import { db } from "./db/db";
import { getIndex } from "./utils/getIndex";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
db();

app.get("/", async (req: Request, res: Response) => {
  getBooks();
  getIndex();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
