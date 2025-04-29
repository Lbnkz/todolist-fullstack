const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasksController');

router.post('/query', tasksController.query);

module.exports = router;