const Task = require('../models/task')
const Users = require('../models/taska')
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json({ task })
    } 
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body)
        res.status(200).json({ user })
    } 
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getAllUsers = async (req, res) => {
    try {   
        const data = await Users.find({})
        res.status(200).json({ data })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}


const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        }
        res.status(200).json({ task })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}


const getUser = async (req, res) => {
    try {
        const { name: name } = req.params
        const task = await Users.findOne({ username: name });
        if (!task) {
            return res.status(404).json({ msg: `No task with user: ${name}` })
        }
        res.status(200).json({ task })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const upadateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body,{
            new:true,
            runValidators:true,
        })
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        }
        res.status(200).json({ id: taskID, data: req.body })
    }
    catch (error) {
        res.status(500).json({ msg: error })

    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        }
        res.status(200).json({ task })
    }
    catch (error) {
        res.status(500).json({ msg: error })

    }
}
module.exports = {
    getAllTasks, createTask, getTask, upadateTask, deleteTask , createUser, getAllUsers,getUser 
}