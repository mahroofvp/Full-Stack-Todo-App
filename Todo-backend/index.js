const express = require('express')
const app = express()

const cors = require('cors');
const connectDb = require('./config/db');
require('dotenv').config()
const todoRoute = require('./routes/todoRoute')


app.use(cors())
app.use(express.json())
app.use('/todo', todoRoute)


connectDb()







//  if we get request from other route. except ("/")
//  the "*" indicating every other route that we don't give.
app.all("*",(req, res)=> {
    res.status(404).json("This page does not exist")
})

const PORT = process.env.PORT||2000
app.listen(PORT,()=>{
    console.log(`App created in port no http://localhost:${PORT}`)
})
