const { ValidationError, NotFoundError } = require("../../../utils/helper/response");
const { UserTaskServiceInterface } = require("../entity/interface");

class UserTaskService extends UserTaskServiceInterface {
  constructor(userTaskRepository) {
    super();
    this.userTaskRepository = userTaskRepository;
  }

  async inputTask(userTask, file) {
    if (!file) {
      throw new ValidationError("File is required");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new ValidationError("File size exceeds the maximum allowed limit (5 MB)");
    }

    const createdUserTask = await this.userTaskRepository.inputTask(
      userTask,
      file
    );
    createdUserTask.status = "completed";
    return createdUserTask;
  }

  async getUserTaskById(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const userTask = await this.userTaskRepository.getUserTaskById(id);
    return userTask;
  }

  async getAllUserTask() {
    const userTasks = await this.userTaskRepository.getAllUserTask();
    if (userTasks.length === 0) {
      throw new NotFoundError("No user tasks found");
    }
    return userTasks;
  }

  async updateTask(id, userTask, file) {
    if (!file) {
      throw new ValidationError("File is required");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new ValidationError("File size exceeds the maximum allowed limit (5 MB)");
    }

    const updatedUserTask = await this.userTaskRepository.updateTask(
      id,
      userTask,
      file
    );
    return updatedUserTask;
  }

  async deleteTask(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const deletedUserTask = await this.userTaskRepository.deleteTask(id);
    return deletedUserTask;
  }
}

module.exports = UserTaskService;