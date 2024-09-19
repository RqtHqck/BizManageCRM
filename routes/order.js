const express = require('express');
const controller = require('../controllers/order')
const router = express.Router()

// localhost:3000/api/order
router.get('/', controller.getAll)
// localhost:3000/api/order
router.post('/', controller.create)

module.exports = router
