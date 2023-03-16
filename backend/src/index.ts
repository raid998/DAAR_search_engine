import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getBooks } from "./utils/getBooks";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
  console.log(await getBooks());
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
