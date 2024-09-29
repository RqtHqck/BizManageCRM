const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  
}, { versionKey: false })

module.exports = mongoose.model('positions', positionSchema)