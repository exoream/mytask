const {
  NotFoundError,
  ValidationError,
  DuplicateError,
  AuthenticationError,
  UnauthorizedError,
} = require("../../../utils/helper/response");
const { extractToken } = require("../../../utils/jwt/jwt");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    const { name, email, password, role } = req.body;
    const user = { name, email, password, role };

    try {
      await this.userService.create(user);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DuplicateError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const { id, role } = extractToken(req);
      if (id === Number(userId)) {
        const user = await this.userService.getById(userId);
        res.status(200).json(user);
      } else {
        res.status(403).json({ message: "Unauthorized access" });
      }
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError || error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Failed to get user" });
      }
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to get users" });
      }
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const user = req.body;

    try {
      await this.userService.update(userId, user);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DuplicateError
      ) {
        res.status(error.statusCode).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to update user" });
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      await this.userService.delete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Failed to delete user" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { user, token } = await this.userService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof AuthenticationError
      ) {
        res.status(error.statusCode).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
