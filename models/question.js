const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  question_id: String,
  question_text: String,
  session_id: String
});

module.exports = mongoose.model('question', Question);
