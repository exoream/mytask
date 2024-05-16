const { DataTypes } = require("sequelize");

class UserTaskCore {
  constructor(id, userId, taskId, taskFile, status, completedDate) {
    this.id = id;
    this.userId = userId;
    this.taskId = taskId;
    this.taskFile = taskFile;
    this.status = status;
    this.completedDate = completedDate;
  }
}

module.exports = UserTaskCore;
