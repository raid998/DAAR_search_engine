import mongoose from "mongoose";

interface IBook {
  id: number;
  titre: string;
  texte: string;
  auteurs: string[];
  link: string;
  neighbors: number[];
  crank: number;
}

const bookSchema = new mongoose.Schema<IBook>({
  id: { type: Number, required: true, unique: true },
  titre: { type: String, required: true },
  texte: { type: String, required: true },
  auteurs: [{ type: String, required: true }],
  link: { type: String, required: true },
  neighbors: [{ type: Number, required: true }],
  crank: { type: Number, required: true },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);
