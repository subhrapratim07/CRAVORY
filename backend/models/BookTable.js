// models/BookTable.js
const mongoose = require('mongoose');

const BookTableSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  guests: Number,
  date: String,
  time: String,
});

const BookTableModel = mongoose.model('book_table', BookTableSchema);

module.exports = BookTableModel;
