function taskRequest(body) {
  const { title, description, due_date } = body;
  return { title, description, due_date };
}


module.exports = { taskRequest };