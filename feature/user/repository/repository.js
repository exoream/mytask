const { UserRepository } = require('../entity/interface');
const { User } = require('../model/model');
const { mapMainToModel, mapModelToMain } = require('../entity/mapping');

class UserRepositoryImpl extends UserRepository {
  constructor(sequelize) {
    super();
    this.UserModel = User;
    this.sequelize = sequelize;
  }

  async create(data) {
    const user = mapMainToModel(data);
    const createdUser = await this.UserModel.create(user);
    return mapModelToMain(createdUser);
  }

  async getById(id) {
    const user = await this.UserModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return mapModelToMain(user);
  }

  async getAll() {
    const users = await this.UserModel.findAll();
    return users.map(user => mapModelToMain(user));
  }

  async update(id, updatedData) {
    const user = await this.UserModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = mapMainToModel(updatedData);
    await user.update(updatedUser);

    return mapModelToMain(user);
  }

  async delete(id) {
    const user = await this.UserModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();

    return true;
  }
}

module.exports = UserRepositoryImpl;
