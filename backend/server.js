const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mainRouter = require('./router/mainRouter.js')
const DB_conn = require('./Db_conn.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRouter = require('./router/userProfile.js')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', mainRouter)
app.use('/', userRouter)

DB_conn().then(() => {
    console.log('Connected to database')
}).catch((error) => {
    console.error('Database connection error:', error)
})

module.exports = app // Do not use app.listen() for Vercel deployment