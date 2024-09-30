const express = require('express');
const passport = require('passport') 
const controller = require('../controllers/position')
const router = express.Router()

// localhost:3000/api/position
router.get('/:categoryId', passport.authenticate('jwt', {session:false}), controller.getByCategoryId)
// localhost:3000/api/position
router.post('/', passport.authenticate('jwt', {session:false}), controller.create)
// localhost:3000/api/position
router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.update)
// localhost:3000/api/position
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.delete)

module.exports = router
