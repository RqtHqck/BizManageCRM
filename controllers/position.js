const Position = require("../models/Position")
const errorHandler = require('../utils/errorHandler')


module.exports.getByCategoryId = async function(req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId, 
      user: req.user.id  // taken from request, because jwt done fn return 
    })
    res.status(200).json(position)
  } catch (error) {errorHandler(error)}
}

module.exports.create = function(req, res) {
  try {
    
  } catch (error) {errorHandler(error)}
}

module.exports.update = function(req, res) {
  try {
    
  } catch (error) {errorHandler(error)}
}

module.exports.delete = function(req, res) {
  try {
    
  } catch (error) {errorHandler(error)}
}
