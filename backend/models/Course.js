const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  provider: String,
  level: String,
  url: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
