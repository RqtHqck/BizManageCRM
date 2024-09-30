const express = require('express');
const passport = require('passport') 
const controller = require('../controllers/order')
const router = express.Router()

// localhost:3000/api/order?offset=x&limit=y&start=date1&end=date2&
router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll)
// localhost:3000/api/order
router.post('/', passport.authenticate('jwt', {session:false}), controller.create)

module.exports = router
 