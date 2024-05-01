const express = require('express')
const cors = require('cors'); // Add this line
const app = express()
const tasks = require('./routes/tasks')
const projects = require('./routes/project')
const boards = require('./routes/boards')
const connectDB = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use(cors({ origin: '*' })); // Add this line

app.use('/api/v1/tasks', tasks)
app.use('/api/v1/projects', projects)
app.use('/api/v1/boards', boards)

const port = 3000

const start = async () =>{
    try{
        await connectDB('mongodb+srv://nishu:astro@nodenishu.tl2ymec.mongodb.net/?retryWrites=true&w=majority&appName=nodenishu')
        app.listen(port, console.log(`Server is listening on port ${port}`))
    }
    // mongodb+srv://nishu:astro@nodenishu.tl2ymec.mongodb.net/?retryWrites=true&w=majority&appName=nodenishu
    // mongodb+srv://patelsiddhi2002:PU5EI9MRHcu1Jnsy@cluster0.gg3p4lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    catch (error){
        console.log(error)
    }
}

start()