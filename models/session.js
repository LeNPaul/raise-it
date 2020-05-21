const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sessions = new Schema({
  session_id: String,
  session_name: String,
  session_description: String,
  session_location: String,
  session_url: String,
  host_name: String,
  state_date_time: Date,
  end_date_time: Date
});

module.exports = mongoose.model('sessions', Sessions);
