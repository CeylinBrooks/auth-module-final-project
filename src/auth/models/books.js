"use strict";
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  authors: { type: String, required: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  image_url: { type: String, required: true },
  book_description: { type: String, required: true },
  pubdate: { type: String, required: true },
});

const booksModel = mongoose.model("books", bookSchema);

module.exports = booksModel;
