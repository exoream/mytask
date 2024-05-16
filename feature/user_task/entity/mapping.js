const UserTaskCore = require("../model/model");

function userTasksCoreToUserTasksModel(task) {
  return {
    id: task.id,
    user_id: task.userId,
    task_id: task.taskId,
    task_file: task.taskFile,
    status: task.status,
    completed_date: task.completedDate,
  };
}

function userTasksModelToUserTasksCore(task) {
  const taskCore = new UserTaskCore(
    task.id,
    task.user_id,
    task.task_id,
    task.task_file,
    task.status,
    task.completed_date
  );
  return taskCore;
}

function listUserTasksCoreToListUserTasksModel(tasks) {
  const listTask = [];
  for (const task of tasks) {
    const taskModel = UserTaskCoreToTaskModel(task);
    listTask.push(taskModel);
  }
  return listTask;
}

function listUserTasksModelToListUserTasksCore(tasks) {
  const listTask = [];
  for (const task of tasks) {
    const taskCore = UserTaskModelToTaskCore(task);
    listTask.push(taskCore);
  }
  return listTask;
}

module.exports = {
    userTasksCoreToUserTasksModel,
    userTasksModelToUserTasksCore,
    listUserTasksCoreToListUserTasksModel,
    listUserTasksModelToListUserTasksCore,
}
