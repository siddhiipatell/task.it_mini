const express = require('express')
const router = express.Router();
const {getAllTasks,createTask,getTask,upadateTask,deleteTask,createUser,getAllUsers,getUser} = require('../controllers/tasks')

router.route('/users').get(getAllUsers).post(createUser)
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(upadateTask).delete(deleteTask)
router.route('/users/:name').get(getUser)

module.exports = router