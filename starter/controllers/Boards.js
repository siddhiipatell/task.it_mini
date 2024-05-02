const Boards = require('../models/Boards');
const Users = require('../models/taska');
const jwt = require('jsonwebtoken');

const getAllBoards = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const boards = await Boards.find({ projectId: projectId });
        
        res.status(200).json({ boards });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
const getAllBoardsNo = async (req, res) => {
    try {
        const boards = await Boards.find({});
        res.status(200).json({ boards });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createBoard = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const boardData = {
            projectId: projectId,
            name: req.body.name,
            description: req.body.description,
            // Add other fields as needed
        };

        const board = await Boards.create(boardData);
        res.status(200).json({ board });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        const email = req.body.email;
        const already = await Users.findOne({ email: email });
        if (already) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        res.status(200).json({ user, req: req.body, message: "User Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email, password: password });

        if (user) {
            const token = jwt.sign({ userId: user._id }, 'todo', { expiresIn: '40h' });
            return res.status(200).json({ user, token, message: "User Logged In", status: "success" });
        } else {
            return res.status(400).json({ message: "User Does Not Exist" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await Users.findOne({ username: name });
        if (!user) {
            return res.status(404).json({ msg: `User Not Found ${name}` });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ id: taskId, data: req.body, status: "success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const finishTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskId }, { status: 'finished' }, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ id: taskId, status: 'success' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ task, status: "success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllBoards,
    getAllBoardsNo,
    createBoard,
    createUser,
    login,
    getUser,
    updateTask,
    finishTask,
    deleteTask
};
