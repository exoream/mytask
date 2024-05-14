const User = require("../model/model");
const {
  usersCoreToUsersModel,
  listUserCoreToUserModel,
  usersModelToUsersCore,
  listUserModelToUserCore,
} = require("../entity/mapping");
const { UserRepository } = require("../entity/interface");
const { NotFoundError } = require("../../../utils/helper/response");

class UserRepositoryImpl extends UserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async create(data) {
    const user = usersCoreToUsersModel(data);
    const createdUser = await User.create(user);
    return usersModelToUsersCore(createdUser);
  }

  async getById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const userCore = usersModelToUsersCore(user);
    return userCore;
  }

  async getAll() {
    const users = await User.findAll();
    const userList = listUserModelToUserCore(users);
    return userList;
  }

  async update(id, updatedData) {
    const userModel = usersCoreToUsersModel(updatedData);
    const updatedUser = await User.update(userModel, {
      where: { id: id },
    });
    if (updatedUser[0] === 0) {
      throw new NotFoundError("User not found");
    }
    return usersModelToUsersCore(updatedUser);
  }

  async delete(id) {
    const deletedUser = await User.destroy({
      where: { id: id },
    });
    if (deletedUser === 0) {
      throw new NotFoundError("User not found");
    }
    return true;
  }

  async getByEmail(email) {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return null;
  }
    const userCore = usersModelToUsersCore(user);
    return userCore;
  }
}

module.exports = UserRepositoryImpl;
