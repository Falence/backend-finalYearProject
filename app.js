const express = require('express')
const cors = require('cors')

const searchRouter = require('./routes/searchRoute')

const app = express()


// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/search', searchRouter)

module.exports = app