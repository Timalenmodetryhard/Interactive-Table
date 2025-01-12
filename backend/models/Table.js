const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: String, required: true },
  value: { type: String, required: true },
}, {
  collection: 'Table',
});

module.exports = mongoose.model('Table', tableSchema);
