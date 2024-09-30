const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {type: String},
      quantity: {type: Number},
      cost: {type: Number}
    }
  ],
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId
  }
}, { versionKey: false })

module.exports = mongoose.model('orders', orderSchema)