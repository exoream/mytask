const sequelize = require("sequelize");
const User = require("../../feature/user/model/model");
const Task = require("../../feature/task/model/model");

// Auto Migrate
async function autoMigrate() {
  await User.sync();
  await Task.sync();
  console.log("Auto migration successful");
}

module.exports = autoMigrate;