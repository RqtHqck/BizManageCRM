const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {  // Used for destination
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
}, { versionKey: false })

module.exports = mongoose.model('categories', categorySchema) 