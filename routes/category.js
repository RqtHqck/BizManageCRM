const express = require('express');
const passport = require('passport') 
const controller = require('../controllers/category')
const upload = require('../middleware/upload')
const router = express.Router()

// localhost:3000/api/category/
router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll)
// localhost:3000/api/category?id
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getById)
// localhost:3000/api/category?id
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.delete)
// localhost:3000/api/category/
router.post('/', passport.authenticate('jwt', {session:false}), upload.single('image'), controller.create)
// localhost:3000/api/category?id
router.patch('/:id', passport.authenticate('jwt', {session:false}), upload.single('image'), controller.update)


module.exports = router