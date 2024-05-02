const express = require("express");
const router = express.Router();
const {
  getAllBoards,
  createBoard,
  getAllBoardsNo,
} = require("../controllers/Boards");

// Define routes for getting all boards and creating a board for a specific project
router.route("/:projectId").get(getAllBoards).post(createBoard);
router.route("/").get(getAllBoardsNo).post(createBoard);

module.exports = router;
