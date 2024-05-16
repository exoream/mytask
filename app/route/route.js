const userRoutes = require("../route/route_user");
const taskRoutes = require("../route/route_task");
const userTaskRoutes = require("../route/route_user_task");
const express = require('express');

const router = express.Router();

router.use("", userRoutes);
router.use("", taskRoutes);
router.use("", userTaskRoutes);


module.exports = router;