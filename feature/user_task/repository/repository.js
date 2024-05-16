const { NotFoundError } = require("../../../utils/helper/response");
const cloudinary = require("../../../utils/storage/cloudinary");
const { UserTaskRepositoryInterface } = require("../entity/interface");
const UserTask = require("../model/model");

class UserTaskRepository extends UserTaskRepositoryInterface {
  constructor(db) {
    super();
    this.db = db;
  }

  async inputTask(data, file) {
    const userTask = userTasksCoreToUserTasksModel(data);

    if (file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
      userTask.task_file = cloudinaryResponse.secure_url;
    }
    const createdUserTask = await UserTask.create(userTask);
    return userTasksModelToUserTasksCore(createdUserTask);
  }

  async getUserTaskById(id) {
    const userTask = await UserTask.findByPk(id);
    if (!userTask) {
      throw new NotFoundError("User task not found");
    }
    const userTaskCore = userTasksModelToUserTasksCore(userTask);
    return userTaskCore;
  }

  async getAllUserTask() {
    const userTasks = await UserTask.findAll();
    const userTaskList = listUserTaskModelToUserTaskCore(userTasks);
    return userTaskList;
  }

  async updateTask(id, updatedData, file) {
    const userTaskModel = userTasksCoreToUserTasksModel(updatedData);
    if (file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
      userTaskModel.task_file = cloudinaryResponse.secure_url;
    }
    const updatedUserTask = await UserTask.update(userTaskModel, {
      where: { id: id },
    });
    if (updatedUserTask === 0) {
      throw new NotFoundError("User task not found");
    }
    return userTasksModelToUserTasksCore(updatedUserTask);
  }

  async deleteTask(id) {
    const userTask = await UserTask.findByPk(id);
    if (!userTask) {
        throw new NotFoundError("User task not found");
    }
    const taskFileUrl = userTask.task_file;

    if (taskFileUrl) {
      const publicId = taskFileUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const deletedUserTask = await UserTask.destroy({
      where: { id: id },
    });

    if (deletedUserTask === 0) {
      throw new NotFoundError("User task not found");
    }

    return true;
  }

  async getByUserId(userId) {
    const userTasks = await UserTask.findAll({
      where: { userId: userId },
    });
    const userTaskList = listUserTaskModelToUserTaskCore(userTasks);
    return userTaskList;
  }
}

module.exports = UserTaskRepository;
