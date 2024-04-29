//Map the project ID for the creation of the boards so user can create multiple boards for a project

const express = require('express')
const router = express.Router();
const {getAllBoards,createBoard} = require('../controllers/board')

//for the controller when you create a board you need to know the project id
router.route('/:projectId').get(getAllBoards).post(createBoard)
