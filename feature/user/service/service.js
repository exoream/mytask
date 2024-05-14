const UserRepositoryImpl = require("../repository/repository");
const validator = require("validator");
const {
  generatePasswordHash,
  comparePasswordHash,
} = require("../../../utils/helper/bcrypt");
const { UserUseCase } = require("../entity/interface");
const { createToken } = require("../../../utils/jwt/jwt");
const {
  ValidationError,
  DuplicateError,
  NotFoundError,
  AuthenticationError,
} = require("../../../utils/helper/response");

class UserService extends UserUseCase {
  constructor(userRepo) {
    super();
    this.userRepo = userRepo;
  }

  async create(userCore) {
    // Validasi panjang password
    if (userCore.password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    // Validasi format email
    if (!validator.isEmail(userCore.email)) {
      throw new ValidationError("Invalid email format");
    }

    // Periksa apakah email sudah digunakan
    const existingUser = await this.userRepo.getByEmail(userCore.email);
    if (existingUser) {
      throw new DuplicateError("Email already in use");
    }

    const hashedPassword = await generatePasswordHash(userCore.password);
    userCore.password = hashedPassword;

    const user = await this.userRepo.create(userCore);
    return user;
  }

  async getById(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const user = await this.userRepo.getById(id);
    return user;
  }

  async getAll() {
    const users = await this.userRepo.getAll();
    if (users.length === 0) {
      throw new NotFoundError("No users found");
    }
    return users;
  }

  async update(id, user) {
    // Validasi panjang password
    if (userCore.password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    // Validasi format email
    if (!validator.isEmail(user.email)) {
      throw new ValidationError("Invalid email format");
    }

    // Periksa apakah email sudah digunakan
    const existingUser = await this.userRepo.getByEmail(user.email);
    if (existingUser) {
      throw new DuplicateError("Email already in use");
    }

    const updatedUser = await this.userRepo.update(id, user);
    return updatedUser;
  }

  async delete(id) {
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const deletedUser = await this.userRepo.delete(id);
    return deletedUser;
  }

  async login(email, password) {
    // Validasi format email
    if (!validator.isEmail(email)) {
      throw new ValidationError("Invalid email format");
    }

    // Periksa apakah email terdaftar
    const user = await this.userRepo.getByEmail(email);
    if (!user) {
      throw new NotFoundError("Email not registered");
    }

    // Bandingkan password
    const isPasswordMatch = await comparePasswordHash(password, user.password);
    if (!isPasswordMatch) {
      throw new ValidationError("Incorrect password");
    }

    const token = createToken(user.id, user.role);
    console.log(token);
    return { user, token };
  }
}

module.exports = UserService;
