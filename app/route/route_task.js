const TaskController = require("../../feature/task/controller/controller");
const TaskService = require("../../feature/task/service/service");
const TaskRepository = require("../../feature/task/repository/repository");
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const db = require("../database/database");
const express = require('express');

const taskRepo = new TaskRepository(db);
const taskService = new TaskService(taskRepo);
const taskController = new TaskController(taskService);

const router = express.Router();

router.post('/tasks', jwtMiddleware, taskController.createTask.bind(taskController));
router.get('/tasks', jwtMiddleware, taskController.getTasks.bind(taskController));
router.get('/tasks/:id', jwtMiddleware, taskController.getTaskById.bind(taskController));
router.put('/tasks/:id', jwtMiddleware, taskController.updateTask.bind(taskController));
router.delete('/tasks/:id', jwtMiddleware, taskController.deleteTask.bind(taskController));

module.exports = router;
