const UserController = require("../../feature/user/controller/controller");
const UserService = require("../../feature/user/service/service");
const UserRepositoryImpl = require("../../feature/user/repository/repository");
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const db = require("../database/database");
const express = require('express');

const userRepo = new UserRepositoryImpl(db);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router = express.Router();

router.post('/users/login', userController.login.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.get('/users/:id', jwtMiddleware, userController.getUserById.bind(userController));
router.get('/users', jwtMiddleware, userController.getAllUsers.bind(userController));
router.put('/users/:id', jwtMiddleware, userController.updateUser.bind(userController));
router.delete('/users/:id', jwtMiddleware, userController.deleteUser.bind(userController));

module.exports = router;
