const userRoutes = require("../route/route_user");
const taskRoutes = require("../route/route_task");
const express = require('express');

const router = express.Router();

router.use("", userRoutes);
router.use("", taskRoutes);


module.exports = router;