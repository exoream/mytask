class UserTaskRepositoryInterface {
  async inputTask(userTask, file) {
    throw new Error("Method not implemented");
  }

  async updateTask(id, userTask, file) {
    throw new Error("Method not implemented");
  }

  async deleteTask(id) {
    throw new Error("Method not implemented");
  }

  async getUserTaskById(id) {
    throw new Error("Method not implemented");
  }

  async getAllUserTask() {
    throw new Error("Method not implemented");
  }
}

class UserTaskServiceInterface {
  async inputTask(userTask, file) {
    throw new Error("Method not implemented");
  }

  async updateTask(id, userTask, file) {
    throw new Error("Method not implemented");
  }

  async deleteTask(id) {
    throw new Error("Method not implemented");
  }

  async getUserTaskById(id) {
    throw new Error("Method not implemented");
  }

  async getAllUserTask() {
    throw new Error("Method not implemented");
  }
}

module.exports = { UserTaskRepositoryInterface, UserTaskServiceInterface };