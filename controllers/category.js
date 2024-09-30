const Category = require("../models/Category")
const Position = require("../models/Position")
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
  try {
    const categories = await Category.find({ user: req.user.id })
    res.status(200).json(categories==[] ? { message: "No categories" } : categories)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const category = await Category.findById({ 
      _id: req.params.id, 
      user: req.user.id 
    })
    res.status(200).json(category)  
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.create = async function(req, res) {
  try {
    const category = new Category({
      name: req.body.name,
      id: req.body.id,
      user: req.user.id,
      imageSrc: req.file ? req.file.path.replace(process.cwd(), '') : ''
    })

    await category.save()
    res.status(201).json(category)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.update = async function(req, res) {
  try {
    const updated = {
      name: req.body.name,
      imageSrc: req.file.path.replace(process.cwd(), '') || ''
    }
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    
    res.status(200).json(category || { status:false, message: "No category" })
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.delete = async function(req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id })
    await Position.deleteMany({ category: req.params.id })
    res.status(204).end();
  } catch (error) { errorHandler(res, error) }
}


