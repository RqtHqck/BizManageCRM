const express = require('express');
const controller = require('../controllers/position')
const router = express.Router()

// localhost:3000/api/position
router.get('/:category', controller.getByCategoryId)
// localhost:3000/api/position
router.post('/', controller.create)
// localhost:3000/api/position
router.patch('/:id', controller.update)
// localhost:3000/api/position
router.delete('/:id', controller.delete)

module.exports = router
