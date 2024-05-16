const {
  NotFoundError,
  ValidationError,
  DuplicateError,
  AuthenticationError,
  UnauthorizedError,
  ForbiddenResponse,
} = require("../../../utils/helper/response");
const { extractToken } = require("../../../utils/jwt/jwt");
const { userRequest } = require("../dto/request");
const {
  successCreateResponse,
  successGetResponse,
  serverErrorResponse,
} = require("../../../utils/helper/response");
const {
  userResponse,
  userListResponse,
  loginResponse,
} = require("../dto/response");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    const user = userRequest(req.body);

    try {
      await this.userService.create(user);
      return successCreateResponse(res, "User created successfully");
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === Number(userId)) {
        const user = await this.userService.getById(userId);
        return userResponse(res, user);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async getAllUsers(req, res) {
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        const users = await this.userService.getAll();
        return userListResponse(res, users);
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        return serverErrorResponse(res, "Internal server error");
      }
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const user = userRequest(req.body);

    try {
      const { id, role } = extractToken(req);
      if (role === "admin" || id === Number(userId)) {
        await this.userService.update(userId, user);
        return successGetResponse(res, "User updated successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      }
      return serverErrorResponse(res, "Internal server error");
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const { role } = extractToken(req);
      if (role === "admin") {
        await this.userService.delete(userId);
        return successGetResponse(res, "User deleted successfully");
      } else {
        ForbiddenResponse.sendUnauthorized(res);
      }
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      }

      return serverErrorResponse(res, "Internal server error");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { user, token } = await this.userService.login(email, password);
      return loginResponse(res, user, token);
    } catch (error) {
      console.error(error);
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof AuthenticationError
      ) {
        res.status(error.statusCode).json({ error: error.message });
      }
      return serverErrorResponse(res, "Internal server error");
    }
  }
}

module.exports = UserController;
