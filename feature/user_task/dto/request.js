function userTaskRequest(body) {
  const { userId, taskId } = body;
  return { userId, taskId };
}

module.exports = userTaskRequest;