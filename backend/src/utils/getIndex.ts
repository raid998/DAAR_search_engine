import { Index } from "../model/index.model";
import { Book } from "../model/book.model";

export const getIndex = async () => {
  const books = await Book.find().exec();

  for (let book of books) {
    const words = book.texte.toLowerCase().split(/\W+/);
    for (const word of words) {
      if (word == "" || word.length <= 3) continue;

      const index = await Index.findOne({ word });
      if (!index) {
        const newIndex = new Index({
          word,
          books: [book.id],
        });
        await newIndex.save();
      } else {
        const bookIds = index.books;
        if (!bookIds.find((id) => id == book.id)) {
          index.books.push(book.id);
          await index.save();
        } else {
          // mettre la fréquence / nb occurrence
          continue;
        }
      }
    }
  }
  console.log("Fini le traitement");
};
