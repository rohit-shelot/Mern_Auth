const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const mainRouter = require('./router/mainRouter.js')
const port = process.env.PORT;
const DB_conn = require('./Db_conn.js');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require('./router/userProfile.js')

app.use(express.json())
    app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
    }));
app.use(cookieParser())

app.use('/api/auth',mainRouter);
app.use('/',userRouter)

DB_conn().then(()=>{

    app.listen(port,()=>{
        console.log(`The Server is listenting at the port ${port}`)
    })
}
).catch(()=>{
    console.log(`Error in Server.`)
})