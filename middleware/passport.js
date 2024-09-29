require('dotenv').config({ path: './config/.env' });
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const User = require('mongoose').model('users')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_KEY
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.id).select('email id')
        
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
}

  