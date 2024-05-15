function taskRequest(body) {
  const { title, description, dueDate } = body;
  return { title, description, dueDate };
}


module.exports = { taskRequest };