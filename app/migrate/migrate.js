const sequelize = require("sequelize");
const User = require("../../feature/user/model/model");

// Auto Migrate
(async () => {
  await User.sync();
  console.log("Auto migration successful");
})();
