function taskResponse(res, task) {
  const { id, title, description, dueDate } = task;
  return res
    .status(200)
    .json({
      id: id,
      title: title,
      description: description,
      due_date: dueDate,
    });
}

function taskListResponse(res, taskList) {
  return res.status(200).json(
    taskList.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.dueDate,
    }))
  );
}

module.exports = { taskResponse, taskListResponse };
