const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
  topic: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Data', DataSchema);