const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config({ path: './config/.env' });
// Routes -------------------------------------------
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const analyticsRoutes = require('./routes/analytics')
// Other requirements
const keys = require('./config/keys')


const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB database connected'))
  .catch(error => console.error(error))

app.use(require('morgan')('dev')) //
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