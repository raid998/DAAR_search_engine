import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const db = () => {
  mongoose
    .connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/searchengine")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error while connecting to database", err);
    });
};
