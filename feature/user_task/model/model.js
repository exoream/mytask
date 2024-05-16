const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../../app/database/database");
const User = require("../../user/model/model");
const Task = require("../../task/model/model");

const UserTask = sequelize.define(
  "user_task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    task_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
    },
    completed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// Define associations
UserTask.belongsTo(User, { foreignKey: "userId" });
UserTask.belongsTo(Task, { foreignKey: "taskId" });

module.exports = UserTask;
