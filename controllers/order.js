const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try{
    const query = {
      user: req.user.id
    };

    // If data start in query exists:
    if (req.query.start) {
      query.date = {
        $gte: req.query.start // Greater or equal
      }
    }
    // If data end in query exists:
    if (req.query.end) {
      if (!query.date) {
        query.date = {}
      }
      query.date['$lte'] = req.query.end; // Less or equal
    }
    // If order in query exists:
    if (req.query.order) {
      query.order = +req.query.order
    }

    const orders = await Order
    .find(query) // Find relying on query request
    .sort({date: -1}) // Sorting by secreasing date
    .skip(+req.query.offset) // Offset converted number 
    .limit(+req.query.limit) // Limit converted number
    
    res.status(200).json(orders)
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.create = async function(req, res) {
  try{
    const lastOrder = await Order // Take last order in mongodb
    .findOne( {user: req.user.id} )
    .sort( {date: -1} ) 

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save()
    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
}