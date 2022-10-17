import express from "express";
import cors from "cors";

import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "niniko",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("Hello this is the backend");
});

// get all books

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.status(200).json(data);
  });
});

// add new book

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`,`description`,`price`,`cover`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }

    return res.status(200).json("Book added succesfully");
  });
});

// get book

app.get("/books/:bookId", (req, res) => {
  const q = "SELECT * FROM books WHERE id=?";
  db.query(q, [req.params.bookId], (error, data) => {
    if (error) {
      return res.json(error);
    }

    return res.status(200).json(data);
  });
});

// update the book
app.put("/books/:bookId", (req, res) => {
  const q =
    "UPDATE books SET `title`=?,`description`=?,`price`=?,`cover`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, req.params.bookId], (error, data) => {
    if (error) {
        console.log(error);
      return res.json(error);
    }
    console.log(data);
    return res.status(200).json("Book updated succesfully");
  });
});

// delete books

app.delete("/books/:bookId", (req, res) => {
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [req.params.bookId], (error, data) => {
    if (error) {
      return res.json(err);
    }
    console.log(data);
    return res.status(200).json("Book deleted succesfully");
  });
});

app.listen(4000, () => {
  console.log("backend connected");
});
