const {
  successCreateResponse,
  serverErrorResponse,
  successGetResponse,
} = require("../../../utils/helper/response");
const { taskRequest } = require("../dto/request");
const { taskResponse, taskListResponse } = require("../dto/response");
const { extractToken } = require("../../../utils/jwt/jwt");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  ForbiddenResponse,
  UnauthorizedError,
} = require("../../../utils/helper/response");

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async createTask(req, res) {
    const task = taskRequest(req.body);
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.taskService.createTask(task);
        return successCreateResponse(res, "Task created successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getTaskById(req, res) {
    const taskId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const task = await this.taskService.getTaskById(taskId);
        return taskResponse(res, task);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getTasks(req, res) {
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const tasks = await this.taskService.getTasks();
        return taskListResponse(res, tasks);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async updateTask(req, res) {
    const taskId = req.params.id;
    const task = taskRequest(req.body);
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.taskService.updateTask(taskId, task);
        return successCreateResponse(res, "Task updated successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async deleteTask(req, res) {
    const taskId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.taskService.deleteTask(taskId);
        return successGetResponse(res, "Task deleted successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      }
      return serverErrorResponse(res, "Internal server error");
    }
  }
}

module.exports = TaskController;
