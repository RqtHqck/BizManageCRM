const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // User exists, compare passwords with bcrypt
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

    if (passwordResult) {
      // Password comparing is clear, generate jwt 
      const playloads = {
        email: candidate.email,
        id: candidate._id
      }
      const token = jwt.sign(playloads, process.env.JWT_KEY, {expiresIn:3600});

      res.status(200).json({token:`Bearer ${token}`})  // Bearer for JwtStrategy
    } else {
      // Passwords comparing is failed 
      res.status(401).json({message: 'Incorrect password'})
    }
  } else {
    // User not founded, return error 404
    res.status(404).json({message: 'User with this email not found'})
  }
}

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email}) // Find user by email if exists
  if (candidate) {
    // If user with email exists
    res.status(409).json({message:'This email is already exists'})
  } else {
    // Create and save user
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch(error) {
      errorHandler(res, error)
    }
  }
}
