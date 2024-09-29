const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    ref: 'categories',
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
}, { versionKey: false })

module.exports = mongoose.model('positions', positionSchema)