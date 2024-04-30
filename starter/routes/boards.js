const express = require('express');
const router = express.Router();
const { getAllBoards, createBoard } = require('../controllers/Boards');

// Define routes for getting all boards and creating a board for a specific project
router.route('/:projectId')
    .get(getAllBoards)
    .post(createBoard);

module.exports = router;
