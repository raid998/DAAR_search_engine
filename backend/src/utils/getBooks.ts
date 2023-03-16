import dotenv from "dotenv";

dotenv.config();

export const getBooks = async () => {
  const books = [];
  const API_URL: string = process.env.API_URL || "https://gutendex.com/books/";
  for (let i = 1; i <= 52; i++) {
    const bookList = await fetch(API_URL + "?page=" + i);
    const parsedBookList = await bookList.json();
    books.push(parsedBookList);
  }
  return books;
};
