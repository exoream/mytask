function userTaskResponse(res, userTask) {
  const { userId, taskId, taskFile, status, completedDate } = userTask;
  res.status(200).json({
    userId,
    taskId,
    taskFile,
    status,
    completedDate,
  });
}

function userTaskListResponse(res, userTaskList) {
  return res.status(200).json(
    userTaskList.map((userTask) => ({
      id: userTask.id,
      name: userTask.name,
      email: userTask.email,
    }))
  );
}

module.exports = { userTaskResponse, userTaskListResponse };
