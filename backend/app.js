const express = require('express')
const app = express()
require("dotenv").config()
const connectDB = require('./db')
const userApi = require('./routes/user')
const categoryApi = require('./routes/category')
const podcastApi = require('./routes/podcast')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
}));

//all routes
app.use('/api', userApi)
app.use('/api', categoryApi)
app.use('/api', podcastApi)


app.listen(process.env.PORT, ()=>{
    console.log('Server Started On ' + process.env.PORT)
})