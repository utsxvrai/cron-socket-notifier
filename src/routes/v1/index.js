const express = require('express');
const taskRoutes = require('./task-routes');

const router = express.Router();

// Task routes
router.use('/tasks', taskRoutes);
module.exports = router;