import { Book } from "../model/book.model";
import { Distance } from "../model/distances.model";
import { Index } from "../model/index.model";
import { jaccardDistance } from "../utils/jaccard";

export const search = async (query: string, threshold: number = 0.5) => {
  const words = query.split(/\W+/);
  const results: { [index: number]: number } = {};
  for (const word of words) {
    const index = await Index.findOne({ word });
    console.log(word);
    if (index) {
      for (const book of index.books) {
        if (results[book]) {
          results[book]++;
        } else {
          results[book] = 1;
        }
      }
    }
  }
  for (const bookID in results) {
    if (results[bookID] / words.length < threshold) {
      delete results[bookID];
    }
  }
  console.log(results);

  const scores = await Promise.all(
    Array.from(
      Object.keys(results).map(async (id) => {
        const book = await Book.findOne({ id: +id });
        const texte = book?.texte.split(/\W+/);
        return [
          id,
          jaccardDistance(new Set(words), new Set(texte as string[])),
        ];
      })
    )
  );
  scores.sort((a, b) => (a as number[])[1] - (b as number[])[1]);
  const books = await Promise.all(
    scores.map(async ([id, score]) => await Book.findOne({ id: +id }))
  );
  return { books, suggestions: suggestions(books, []) };
};

const suggestions = (results: any[], rankedBooks: any[]) => {
  const suggestions: Record<number, any> = {};
  for (const book of results) {
    const suggestedBooks = rankedBooks.filter(
      async (book) =>
        (await Distance.findOne({ bookId: book.id }))?.distances.filter(
          (book1) => book1.bookId === book.id
        )[0].distance || 0 < 0.3
    );
    suggestions[book.id] = suggestedBooks;
  }
  return suggestions;
};
