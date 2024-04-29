const express = require('express')
const router = express.Router();
const {getAllProjects,createProject} = require('../controllers/project')
router.route('/').get(getAllProjects).post(createProject)
module.exports = router 