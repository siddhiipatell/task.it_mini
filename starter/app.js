const express = require('express')
const cors = require('cors'); // Add this line
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use(cors({ origin: '*' })); // Add this line

app.use('/api/v1/tasks', tasks)

const port = 3000

const start = async () =>{
    try{
        await connectDB('mongodb+srv://patelsiddhi2002:PU5EI9MRHcu1Jnsy@cluster0.gg3p4lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(port, console.log(`Server is listening on port ${port}`))
    }
    catch (error){
        console.log(error)
    }
}

start()