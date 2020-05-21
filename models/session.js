const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sessions = new Schema({
  session_id: String,
  session_name: String,
  session_description: String,
  host_name: String,
  host_contact_info: String,
  start_date_time: Date,
  end_date_time: Date
});

module.exports = mongoose.model('sessions', Sessions);
