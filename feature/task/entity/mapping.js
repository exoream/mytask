const TaskCore = require("../entity/entity");

function TaskCoreToTaskModel(task) {
  return {
    id: task.id,
    name: task.name,
    description: task.description,
    due_date: task.dueDate,
  };
}

function TaskModelToTaskCore(task) {
  const taskCore = new TaskCore(
    task.id,
    task.name,
    task.description,
    task.due_date
  );
  return taskCore;
}

function listTaskCoreToListTaskModel(tasks) {
  const listTask = [];
  for (const task of tasks) {
    const taskModel = TaskCoreToTaskModel(task);
    listTask.push(taskModel);
  }
  return listTask;
}

function listTaskModelToListTaskCore(tasks) {
  const listTask = [];
  for (const task of tasks) {
    const taskCore = TaskModelToTaskCore(task);
    listTask.push(taskCore);
  }
  return listTask;
}


module.exports = {
  TaskCoreToTaskModel,
  TaskModelToTaskCore,
  listTaskCoreToListTaskModel,
  listTaskModelToListTaskCore,
};