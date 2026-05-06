const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  sNo: String,
  district: String,
  category: String,
  address: String,
  phone: String,
  name: String,
  lat: Number,
  lng: Number,
  completed: { type: Boolean, default: false },
  importDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', RecordSchema);
