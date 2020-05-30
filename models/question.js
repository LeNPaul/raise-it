const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  session_id: String,
  question_id: String,
  question_text: String,
  upvotes: Number,
  is_answered: Boolean,
  submitted_date_time: Date
});

module.exports = mongoose.model('question', Question);
