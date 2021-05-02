'use strict';

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  authors: { type: String, required: true },
  title: { type: Number, required: true },
  isbn: { type: String },
  image_url: { type: String },
  book_description: { type: String },
  pub_date: { type: String },
});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;