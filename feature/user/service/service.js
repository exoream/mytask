const UserRepositoryImpl = require("../repository/repository");
const {
  generatePasswordHash,
  comparePasswordHash,
} = require("../../../utils/helper/bcrypt");
const { UserUseCase }= require("../entity/interface");

class UserService extends UserUseCase{
  constructor(userRepo) {
    super();
    this.userRepo = userRepo;
  }

  async create(userCore) {
    try {
      const hashedPassword = await generatePasswordHash(userCore.password);
      userCore.password = hashedPassword;
      const user = await this.userRepo.create(userCore);
      return user
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }

  async getById(id) {
    try {
      const user = await this.userRepo.getById(id);
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
      const users = await this.userRepo.getAll();
      console.log('Data Users:', users);
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get all users");
    }
  }

  async update(id, user) {
    try {
      const existingUser = await this.userRepo.getById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      // const isPasswordValid = await comparePasswordHash(
      //   user.password,
      //   existingUser.password
      // );
      // if (!isPasswordValid) {
      //   throw new Error("Invalid password");
      // }

      // const newPasswordHash = await generatePasswordHash(user.password);
      // existingUser.password = newPasswordHash;

      const updatedUser = await this.userRepo.update(id, user);
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
      const deletedUser = await this.userRepo.delete(id);
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
