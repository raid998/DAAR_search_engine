import dotenv from "dotenv";
import axios from "axios";
import { Book } from "../model/book.model";
import { jaccardDistance } from "./jaccard";
import { Distance } from "../model/distances.model";
import { Index } from "../model/index.model";
import { writeFileSync } from "fs";

dotenv.config();

export const getBooks = async () => {
  const booksInDB = await Book.find().exec();
  let count = booksInDB.length;

  let API_URL: string =
    process.env.API_URL || "https://gutendex.com/books?mime_type=text%2Fplain";
  while (count < 1664) {
    try {
      const bookList = await axios.get(API_URL);
      const parsedBookList = bookList.data;
      for (const book of parsedBookList.results) {
        try {
          if (book.formats["text/plain; charset=utf-8"]) {
            let textContent = (
              await axios.get(book.formats["text/plain; charset=utf-8"])
            ).data;
            textContent = textContent.split("***")[2];
            if (textContent.toLowerCase().split(/\W+/).length < 10000) continue;
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent,
              auteurs: book.authors.map((p: { name: any }) => p.name),
              link: book.formats["text/plain; charset=utf-8"],
            });

            const distances = (await Book.find().exec()).map((book) => ({
              bookId: book.id,
              distance: jaccardDistance(
                new Set(book.texte.toLowerCase().split(/\W+/)),
                new Set(newBook.texte.toLowerCase().split(/\W+/))
              ),
            }));

            for (const distance of distances) {
              const book = await Distance.findOne({
                bookId: distance.bookId,
              }).exec();
              book?.distances.push({
                bookId: newBook.id,
                distance: distance.distance,
              });
              await book?.save();
            }
            const newDistance = new Distance({ bookId: newBook.id, distances });
            await newBook.save();
            await newDistance.save();
            const words = newBook.texte.toLowerCase().split(/\W+/);
            for (const word of words) {
              if (word == "" || word.length <= 3) continue;

              const index = await Index.findOne({ word });
              if (!index) {
                const newIndex = new Index({
                  word,
                  books: [newBook.id],
                });
                await newIndex.save();
              } else {
                const bookIds = index.books;
                if (!bookIds.find((id) => id == newBook.id)) {
                  index.books.push(newBook.id);
                  await index.save();
                } else {
                  // mettre la fréquence / nb occurrence
                  continue;
                }
              }
            }
          } else if (book.formats["text/plain; charset=us-ascii"]) {
            let textContent = (
              await axios.get(book.formats["text/plain; charset=us-ascii"])
            ).data;
            textContent = textContent.split("***")[2];
            if (textContent.toLowerCase().split(/\W+/).length < 10000) continue;
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent.data,
              auteurs: book.authors.map((p: { name: any }) => p.name),
              link: book.formats["text/plain; charset=us-ascii"],
            });
            const distances = (await Book.find().exec()).map((book) => ({
              bookId: book.id,
              distance: jaccardDistance(
                new Set(book.texte.toLowerCase().split(/\W+/)),
                new Set(newBook.texte.toLowerCase().split(/\W+/))
              ),
            }));

            for (const distance of distances) {
              const book = await Distance.findOne({
                bookId: distance.bookId,
              }).exec();
              book?.distances.push({
                bookId: newBook.id,
                distance: distance.distance,
              });
              await book?.save();
            }
            const newDistance = new Distance({ bookId: newBook.id, distances });
            await newBook.save();
            await newDistance.save();
            const words = newBook.texte.toLowerCase().split(/\W+/);
            for (const word of words) {
              if (word == "" || word.length <= 3) continue;

              const index = await Index.findOne({ word });
              if (!index) {
                const newIndex = new Index({
                  word,
                  books: [newBook.id],
                });
                await newIndex.save();
              } else {
                const bookIds = index.books;
                if (!bookIds.find((id) => id == newBook.id)) {
                  index.books.push(newBook.id);
                  await index.save();
                } else {
                  // mettre la fréquence / nb occurrence
                  continue;
                }
              }
            }
          } else {
            let textContent = (await axios.get(book.formats["text/plain"]))
              .data;
            textContent = textContent.split("***")[2];
            if (textContent.toLowerCase().split(/\W+/).length < 10000) continue;
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent.data,
              auteurs: book.authors.map((p: { name: any }) => p.name),
              link: book.formats["text/plain"],
            });
            const distances = (await Book.find().exec()).map((book) => ({
              bookId: book.id,
              distance: jaccardDistance(
                new Set(book.texte.toLowerCase().split(/\W+/)),
                new Set(newBook.texte.toLowerCase().split(/\W+/))
              ),
            }));

            for (const distance of distances) {
              const book = await Distance.findOne({
                bookId: distance.bookId,
              }).exec();
              book?.distances.push({
                bookId: newBook.id,
                distance: distance.distance,
              });
              await book?.save();
            }
            const newDistance = new Distance({ bookId: newBook.id, distances });
            await newBook.save();
            await newDistance.save();
            const words = newBook.texte.toLowerCase().split(/\W+/);
            for (const word of words) {
              if (word == "" || word.length <= 3) continue;

              const index = await Index.findOne({ word });
              if (!index) {
                const newIndex = new Index({
                  word,
                  books: [newBook.id],
                });
                await newIndex.save();
              } else {
                const bookIds = index.books;
                if (!bookIds.find((id) => id == newBook.id)) {
                  index.books.push(newBook.id);
                  await index.save();
                } else {
                  // mettre la fréquence / nb occurrence
                  continue;
                }
              }
            }
          }
          count++;
          API_URL = parsedBookList.next;
        } catch {
          continue;
        }
      }
    } catch {
      continue;
    }
  }
};
