import { Book } from "../model/book.model";
import { Distance } from "../model/distances.model";
import { Index } from "../model/index.model";
import { jaccardDistance } from "../utils/jaccard";

export const simpleSearch = async (query: string, threshold: number = 0.5) => {
  const words = query.split(/\W+/);
  const results: { [index: number]: number } = {};
  for (const word of words) {
    const index = await Index.findOne({ word });
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
  const suggestion = await suggestions(books);
  return { books, suggestion };
};
export const advancedSearch = async (query: string) => {
  try {
    const books = await Book.aggregate([
      {
        $match: {
          texte: { $regex: query },
        },
      },
      {
        $addFields: {
          occurrences: {
            $size: {
              $regexFindAll: {
                input: "$texte",
                regex: new RegExp(decodeURIComponent(query)),
                options: "i",
              },
            },
          },
        },
      },
      {
        $sort: { occurrences: -1 },
      },
    ]).exec();
    const suggestion = await suggestions(books);
    return { books, suggestion };
  } catch (err) {
    console.log(err);
  }
};
const suggestions = async (results: any[]) => {
  const suggestions: Record<number, any> = {};
  for (const book of results) {
    const suggestedBooks = (
      await Distance.findOne({ bookId: book.id }).exec()
    )?.distances
      .sort((elem1, elem2) => elem1.distance - elem2.distance)
      .slice(0, 3);
    suggestions[book.id] = await Promise.all(
      suggestedBooks?.map((suggestion) =>
        Book.findOne({ id: suggestion.bookId })
      ) || []
    );
  }

  return suggestions;
};
