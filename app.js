const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')))

// Health route
app.get('/', (req, res) => {
  res.send('Social Media API is running')
})

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/post.routes'))

module.exports = app