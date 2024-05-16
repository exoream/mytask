const { ValidationError, DuplicateError, NotFoundError, ForbiddenResponse } = require("../../../utils/helper/response");
const { extractToken } = require("../../../utils/jwt/jwt");
const userTaskRequest = require("../dto/request");
const { userTaskResponse, userTaskListResponse } = require("../dto/response");
const { successCreateResponse, successGetResponse, serverErrorResponse } = require("../../../utils/helper/response");

class UserTaskController {
  constructor(userTaskService) {
    this.userTaskService = userTaskService;
  }

  async inputTask(req, res) {
    const task = userTaskRequest(req.body);
    const file = req.file;
    try {
      const { id, role } = extractToken(req);
      task.userId = id;
      await this.userTaskService.inputTask(task, file);
      return successCreateResponse(res, "Task input successfully");
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getUserTaskById(req, res) {
    const taskId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === Number(taskId)) {
        const userTask = await this.userTaskService.getUserTaskById(taskId);
        return userTaskResponse(res, userTask); 
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getAllUserTask(req, res) {
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const userTasks = await this.userTaskService.getAllUserTask();
        return userTaskListResponse(res, userTasks);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async updateTask(req, res) {
    const taskId = req.params.id;
    const task = userTaskRequest(req.body);
    const file = req.file;
    try {
      const { id, role } = extractToken(req);
      task.userId = id;
      await this.userTaskService.updateTask(taskId, task, file);
      return successCreateResponse(res, "Task updated successfully");
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async deleteTask(req, res) {
    const taskId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === Number(taskId)) {
        await this.userTaskService.deleteTask(taskId);
        return successGetResponse(res, "Task deleted successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }
}

module.exports = UserTaskController;