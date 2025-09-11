const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: String,
  summary: String,
  tags: [String],
  usageGuide: String,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tool', toolSchema);
