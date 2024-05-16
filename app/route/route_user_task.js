const UserTaskController = require("../../feature/user_task/controller/controller");
const UserTaskService = require("../../feature/user_task/service/service");
const UserTaskRepository = require("../../feature/user_task/repository/repository");
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const db = require("../database/database");
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const userTaskRepo = new UserTaskRepository(db);
const userTaskService = new UserTaskService(userTaskRepo);
const userTaskController = new UserTaskController(userTaskService);

const router = express.Router();

router.post('/tasks', jwtMiddleware, upload.single('file'), userTaskController.inputTask.bind(userTaskController));
router.get('/tasks', jwtMiddleware, userTaskController.getAllUserTask.bind(userTaskController));
router.get('/tasks/:id', jwtMiddleware, userTaskController.getUserTaskById.bind(userTaskController));
router.put('/tasks/:id', jwtMiddleware, userTaskController.updateTask.bind(userTaskController));
router.delete('/tasks/:id', jwtMiddleware, userTaskController.deleteTask.bind(userTaskController));

module.exports = router;