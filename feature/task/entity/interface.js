class TaskRepositoryInterface {
  async createTask(task) {
    throw new Error("Method not implemented");
  }

  async getTaskById(id) {
    throw new Error("Method not implemented");
  }

  async getTasks() {
    throw new Error("Method not implemented");
  }

  async updateTask(id, task) {
    throw new Error("Method not implemented");
  }

  async deleteTask(id) {
    throw new Error("Method not implemented");
  }

  async getTaskByName(name) {
    throw new Error("Method not implemented");
  }
}

class TaskServiceInterface {
  async createTask(task) {
    throw new Error("Method not implemented");
  }

  async getTaskById(id) {
    throw new Error("Method not implemented");
  }

  async getTasks() {
    throw new Error("Method not implemented");
  }

  async updateTask(id, task) {
    throw new Error("Method not implemented");
  }

  async deleteTask(id) {
    throw new Error("Method not implemented");
  }
}

module.exports = { TaskRepositoryInterface, TaskServiceInterface };