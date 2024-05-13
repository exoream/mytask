const UserController = require("../../feature/user/controller/controller");
const UserService = require("../../feature/user/service/service");

function initRoutes(app) {
  const userService = new UserService();
  const userController = new UserController(userService);

  app.post("/users", userController.createUser.bind(userController));
  app.get("/users/:id", userController.getUserById.bind(userController));
  app.get("/users", userController.getAllUsers.bind(userController));
  app.put("/users/:id", userController.updateUser.bind(userController));
  app.delete("/users/:id", userController.deleteUser.bind(userController));
}

module.exports = initRoutes;
