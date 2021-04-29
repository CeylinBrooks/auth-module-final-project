"use strict";
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Auther: { type: String, required: true },
});

const booksModel = mongoose.model("books", booksSchema);

module.exports = booksModel;
