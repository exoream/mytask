const { TaskRepositoryInterface } = require("../entity/interface");
const { NotFoundError } = require("../../../utils/helper/response");
const {
  TaskCoreToTaskModel,
  TaskModelToTaskCore,
  listTaskModelToListTaskCore,
} = require("../entity/mapping");

class TaskRepository extends TaskRepositoryInterface {
  constructor(db) {
    super();
    this.db = db;
  }

  async createTask(task) {
    const taskModel = TaskCoreToTaskModel(task);
    const createdTask = await this.db.Task.create(taskModel);
    return TaskModelToTaskCore(createdTask);
  }

  async getTaskById(id) {
    const task = await this.db.Task.findByPk(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    const taskCore = TaskModelToTaskCore(task);
    return taskCore;
  }

  async getTasks() {
    const tasks = await this.db.Task.findAll();
    const listTask = listTaskModelToListTaskCore(tasks);
    return listTask;
  }

  async updateTask(id, task) {
    const taskModel = TaskCoreToTaskModel(task);
    const updatedTask = await this.db.Task.update(taskModel, {
      where: { id: id },
    });
    if (updatedTask[0] === 0) {
      throw new NotFoundError("Task not found");
    }
    return TaskModelToTaskCore(updatedTask);
  }

  async deleteTask(id) {
    const deletedTask = await this.db.Task.destroy({
      where: { id: id },
    });
    if (deletedTask === 0) {
      throw new NotFoundError("Task not found");
    }
    return true;
  }

  async getTaskByName(name) {
    const task = await this.db.Task.findOne({
      where: { name: name },
    });
    if (!task) {
      return null;
    }
    const taskCore = TaskModelToTaskCore(task);
    return taskCore;
  }
}

module.exports = TaskRepository;