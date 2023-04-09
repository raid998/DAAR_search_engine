import mongoose from "mongoose";

export interface IBook {
  id: number;
  titre: string;
  texte: string;
  auteurs: string[];
  link: string;
  crank?: number;
}

const bookSchema = new mongoose.Schema<IBook>({
  id: { type: Number, required: true, unique: true },
  titre: { type: String, required: true },
  texte: { type: String, required: true },
  auteurs: [{ type: String, required: true }],
  link: { type: String, required: true },
  crank: { type: Number, required: false },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);
