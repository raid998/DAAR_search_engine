import dotenv from "dotenv";
import axios from "axios";
import { Book } from "../model/book.model";
import { jaccardDistance } from "./jaccard";
import { Distance } from "../model/distances.model";

dotenv.config();

export const getBooks = async () => {
  const booksInDB = await Book.find().exec();
  const bookInstances: any[] = [];
  const distanceInstances: any[] = [];
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

    let bookAPI = API_URL;
    while (bookInstances.length < 1664) {
      const bookList = await axios.get(bookAPI);
      const page = bookList.data;
      createBooks(page.results, bookInstances, distanceInstances);
      bookAPI = page.next;
    }

    await Distance.insertMany(distanceInstances);

    const cranks = distanceInstances.map((distanceInstance) => ({
      bookId: distanceInstance.bookId,
      crank:
        (bookInstances.length - 1) /
        distanceInstance.distances.reduce(
          (acc: number, cur: { bookId: number; distance: number }) =>
            acc + cur.distance,
          0
        ),
    }));

    await Book.insertMany(
      bookInstances.map((bookInstance) => ({
        ...bookInstance,
        crank: cranks.find((crank) => crank.bookId === bookInstance.id),
      }))
    );

    console.log("books inserted");
  }
};

const createBooks = async (
  results: any[],
  bookInstances: any[],
  distanceInstances: any[]
) => {
  for (let book of results) {
    try {
      if (book.formats["text/plain; charset=utf-8"]) {
        let textContent = (
          await axios.get(book.formats["text/plain; charset=utf-8"])
        ).data;
        textContent = textContent.split("***")[2];
        if (textContent.split(" ").length < 10000) continue;
        const newBook = new Book({
          id: book.id,
          titre: book.title,
          texte: textContent,
          auteurs: book.authors.map((p: { name: any }) => p.name),
          link: book.formats["text/plain; charset=utf-8"],
        });

        const distances = bookInstances.map((book) => ({
          bookId: book.id,
          distance: jaccardDistance(
            book.texte.split(" "),
            newBook.texte.split(" ")
          ),
        }));

        distances.forEach((distance) => {
          const book = distanceInstances.find(
            (distanceInstance) => distanceInstance.bookId == distance.bookId
          );
          book.distances.push({
            bookId: newBook.id,
            distance: distance.distance,
          });
        });

        const newDistance = new Distance({ bookId: newBook.id, distances });
        distanceInstances.push(newDistance);
        bookInstances.push(newBook);
      } else if (book.formats["text/plain; charset=us-ascii"]) {
        let textContent = (
          await axios.get(book.formats["text/plain; charset=us-ascii"])
        ).data;
        textContent = textContent.split("***")[2];
        if (textContent.split(" ").length < 10000) continue;
        const newBook = new Book({
          id: book.id,
          titre: book.title,
          texte: textContent.data,
          auteurs: book.authors.map((p: { name: any }) => p.name),
          link: book.formats["text/plain; charset=us-ascii"],
        });
        const distances = bookInstances.map((book) => ({
          bookId: book.id,
          distance: jaccardDistance(
            book.texte.split(" "),
            newBook.texte.split(" ")
          ),
        }));

        distances.forEach((distance) => {
          const book = distanceInstances.find(
            (distanceInstance) => distanceInstance.bookId == distance.bookId
          );
          book.distances.push({
            bookId: newBook.id,
            distance: distance.distance,
          });
        });

        const newDistance = new Distance({ bookId: newBook.id, distances });
        distanceInstances.push(newDistance);
        bookInstances.push(newBook);
      } else {
        let textContent = (await axios.get(book.formats["text/plain"])).data;
        textContent = textContent.split("***")[2];
        if (textContent.split(" ").length < 10000) continue;
        const newBook = new Book({
          id: book.id,
          titre: book.title,
          texte: textContent.data,
          auteurs: book.authors.map((p: { name: any }) => p.name),
          link: book.formats["text/plain"],
        });
        const distances = bookInstances.map((book) => ({
          bookId: book.id,
          distance: jaccardDistance(
            book.texte.split(" "),
            newBook.texte.split(" ")
          ),
        }));

        distances.forEach((distance) => {
          const book = distanceInstances.find(
            (distanceInstance) => distanceInstance.bookId == distance.bookId
          );
          book.distances.push({
            bookId: newBook.id,
            distance: distance.distance,
          });
        });

        const newDistance = new Distance({ bookId: newBook.id, distances });
        distanceInstances.push(newDistance);
        bookInstances.push(newBook);
      }
    } catch {
      continue;
    }
  }
};
