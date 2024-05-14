const User  = require("../model/model");
const {
  usersCoreToUsersModel,
  listUserCoreToUserModel,
  usersModelToUsersCore,
  listUserModelToUserCore,
} = require("../entity/mapping");
const { UserRepository }= require("../entity/interface");
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
      throw new Error("User not found");
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
      throw new Error("User not found");
    }
    return usersModelToUsersCore(updatedUser);
  }

  async delete(id) {
    const deletedUser = await User.destroy({
      where: { id: id },
    });
    if (deletedUser === 0) {
      throw new Error("User not found");
    }
    return true;
  }
}

module.exports = UserRepositoryImpl;
