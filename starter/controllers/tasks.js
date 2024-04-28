const Task = require('../models/task')
const Users = require('../models/taska')
const jwt = require('jsonwebtoken');

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
        const email = req.body.email
        const already = await Users.findOne({ email: email })
        if (already) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        res.status(200).json({ user, req: req.body, message: "User Created" })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Users.findOne({ email: email, password: password });

        if (user) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'todo', { expiresIn: '40h' });
            return res.status(200).json({ user, token, message: "User Logged In", status: "success" });
        } else {
            return res.status(400).json({ message: "User Does Not Exists" });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

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
        const user = await Users.findOne({ username: name });
        if (!user) {
            return res.status(404).json({ msg: `User Not Found ${name}` })
        }
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const upadateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        })
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        }
        res.status(200).json({ id: taskID, data: req.body,status:"success" })
    }
    catch (error) {
        res.status(500).json({ msg: error })

    }
}

const finishTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, { status: 'finished' }, {
            new: true,
            runValidators: true,
        } )
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        }
        res.status(200).json({ id: taskID, status: 'success' })
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
        res.status(200).json({ task ,status:"success"})
    }
    catch (error) {
        res.status(500).json({ msg: error })

    }
}
module.exports = {
    getAllTasks, createTask, getTask, upadateTask, deleteTask, createUser, getAllUsers, getUser,login,finishTask
}