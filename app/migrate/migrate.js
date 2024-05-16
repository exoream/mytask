const sequelize = require("sequelize");
const User = require("../../feature/user/model/model");
const Task = require("../../feature/task/model/model");
const UserTask = require("../../feature/user_task/model/model");

// Auto Migrate
async function autoMigrate() {
  await User.sync();
  await Task.sync();
  await UserTask.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;