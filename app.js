const express = require('express');
require('dotenv').config({ path: './config/.env' });
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport')
// Routes -------------------------------------------
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const analyticsRoutes = require('./routes/analytics')

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error(error))

// Passport 
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/uploads', express.static('uploads')) // Create static folder
app.use(require('morgan')('dev')) // Server output
app.use(require('cors')())  // Cors attacks defend
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json())

// Connect routes ----------------------------------
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes) 
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/analytics', analyticsRoutes)

module.exports = app