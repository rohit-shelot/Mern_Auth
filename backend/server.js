const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const mainRouter = require('./router/mainRouter.js')
const DB_conn = require('./Db_conn.js');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require('./router/userProfile.js')

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth',mainRouter);
app.use('/',userRouter)

DB_conn().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error in Server:', error);
});
module.exports = app;