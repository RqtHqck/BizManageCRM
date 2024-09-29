const Position = require("../models/Position")
const errorHandler = require('../utils/errorHandler')


module.exports.getByCategoryId = async function(req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId, 
      user: req.user.id  // taken from request, because jwt done fn return 
    })
    res.status(200).json(positions)
  } catch (error) {errorHandler(error)}
}

module.exports.create = async function(req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save()
    res.status(201).json(position);
  } catch (error) {errorHandler(res, error)}
}

module.exports.update = async function(req, res) {
  try {
    const position = await Position.findOneAndUpdate({
      _id: req.params.id},
      {$set: req.body},  // Set another data 
      {new: true} // Say mongoose update data and return new data
    )
    res.status(200).json(position)
  } catch (error) {errorHandler(res, error)}
}

module.exports.delete = async function(req, res) {
  try {
    await Position.remove({_id: req.params.id});
    res.status(204).json({message: "Position removed"})
  } catch (error) {errorHandler(res, error)}
}
