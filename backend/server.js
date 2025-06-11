const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mainRouter = require('./router/mainRouter.js')
const DB_conn = require('./Db_conn.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// API routes
app.use('/api/auth', mainRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

DB_conn().then(() => {
  console.log('Connected to database')
}).catch((error) => {
  console.error('Database connection error:', error)
})

module.exports = app // Do not use app.listen() for Vercel deployment