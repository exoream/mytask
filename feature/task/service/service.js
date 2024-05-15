const { TaskServiceInterface } = require("../entity/interface");
const {
  ValidationError,
  DuplicateError,
} = require("../../../utils/helper/response");

class TaskService extends TaskServiceInterface {
  constructor(taskRepository) {
    super();
    this.taskRepository = taskRepository;
  }

  async createTask(task) {
    if (!task.title) {
      throw new ValidationError("Title is required");
    }

    if (!task.description) {
      throw new ValidationError("Description is required");
    }

    if (!task.dueDate) {
      throw new ValidationError("Due date is required");
    }

    const exitingTask = await this.taskRepository.getTaskByName(task.name);
    if (exitingTask) {
      throw new DuplicateError("Task already exists");
    }

    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    if (dueDate < currentDate) {
      throw new ValidationError("Due date must be greater than current date");
    }

    const tasks = await this.taskRepository.createTask(task);
    return tasks;
  }

  async getTaskById(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const task = await this.taskRepository.getTaskById(id);
    return task;
  }

  async getTasks() {
    const tasks = await this.taskRepository.getTasks();
    if (tasks.length === 0) {
      throw new NotFoundError("No users found");
    }
    return tasks;
  }

  async updateTask(id, task) {
    if (!task.title) {
      throw new ValidationError("Title is required");
    }

    if (!task.description) {
      throw new ValidationError("Description is required");
    }

    if (!task.dueDate) {
      throw new ValidationError("Due date is required");
    }

    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);
    if (dueDate < currentDate) {
      throw new ValidationError("Due date must be greater than current date");
    }

    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const updatedTask = await this.taskRepository.updateTask(id, task);
    return updatedTask;
  }

  async deleteTask(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const deletedTask = await this.taskRepository.deleteTask(id);
    return deletedTask;
  }
}

module.exports = TaskService;