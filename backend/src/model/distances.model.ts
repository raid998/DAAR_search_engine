import mongoose from "mongoose";

interface IDistance {
  bookId: number;
  distances: { bookId: number; distance: number }[];
}

const distanceSchema = new mongoose.Schema<IDistance>({
  bookId: { type: Number, required: true },
  distances: [
    {
      type: {
        bookId: { type: Number, required: true },
        distance: { type: Number, required: true },
      },
      required: true,
    },
  ],
});

export const Distance = mongoose.model<IDistance>("Distance", distanceSchema);
