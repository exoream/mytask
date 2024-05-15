function taskResponse(res, task) {
  const { id, title, description, due_date } = task;
  return res.status(200).json({ id, title, description, due_date });
}

module.exports = { taskResponse };