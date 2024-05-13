const UserRepository = require("../repository/repository");
const {
  generatePasswordHash,
  comparePasswordHash,
} = require("../../../utils/helper/bcrypt");

class UserService {
  constructor() {
    this.userRepository = UserRepository;
  }

  async create(user) {
    try {
      const hashedPassword = await generatePasswordHash(user.password);
      user.password = hashedPassword;

      return await this.userRepository.create(user);
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async getById(id) {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }

  async getAll() {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw new Error("Failed to get all users");
    }
  }

  async update(id, user) {
    try {
      const existingUser = await this.userRepository.getById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      const isPasswordValid = await comparePasswordHash(
        user.password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const newPasswordHash = await generatePasswordHash(user.password);
      existingUser.password = newPasswordHash;

      const updatedUser = await this.userRepository.update(id, existingUser);
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }

      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async delete(id) {
    try {
      const deletedUser = await this.userRepository.delete(id);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}

module.exports = UserService;
