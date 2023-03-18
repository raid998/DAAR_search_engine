import dotenv from "dotenv";
import axios from "axios";
import { Book } from "../model/book.model";

dotenv.config();

export const getBooks = async () => {
  const booksInDB = await Book.find().exec();
  const bookInstances = [];
  if (!booksInDB.length) {
    const pages = [];
    const API_URL: string =
      process.env.API_URL ||
      "https://gutendex.com/books?mime_type=text%2Fplain";
    for (let i = 1; i <= 1; i++) {
      try {
        const bookList = await axios.get(API_URL + "&page=" + i);
        const parsedBookList = bookList.data;
        pages.push(parsedBookList);
      } catch {
        continue;
      }
    }
    for (let page of pages) {
      for (let book of page.results) {
        try {
          if (book.formats["text/plain; charset=utf-8"]) {
            const textContent = await axios.get(
              book.formats["text/plain; charset=utf-8"]
            );
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent.data,
            });
            bookInstances.push(newBook);
          } else if (book.formats["text/plain; charset=us-ascii"]) {
            const textContent = await axios.get(
              book.formats["text/plain; charset=us-ascii"]
            );
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent.data,
            });
            bookInstances.push(newBook);
          } else {
            const textContent = await axios.get(book.formats["text/plain"]);
            const newBook = new Book({
              id: book.id,
              titre: book.title,
              texte: textContent.data,
            });
            bookInstances.push(newBook);
          }
        } catch {
          continue;
        }
      }
    }
    await Book.insertMany(bookInstances);
  }
};
