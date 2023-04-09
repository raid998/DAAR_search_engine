import mongoose from "mongoose";

interface IIndex {
  word: string;
  books: number[];
}

const indexSchema = new mongoose.Schema<IIndex>({
  word: { type: String, required: true, unique: true },
  books: [{ type: Number, required: true }],
});

export const Index = mongoose.model<IIndex>("Index", indexSchema);
