class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    async createUser(req, res) {
      try {
        const user = req.body;
        await this.userService.create(user);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
      }
    }
  
    async getUserById(req, res) {
      try {
        const userId = req.params.id;
        const user = await this.userService.getById(userId);
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ message: 'User not found' });
      }
    }
  
    async getAllUsers(req, res) {
      try {
        const users = await this.userService.getAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Failed to get users' });
      }
    }
  
    async updateUser(req, res) {
      try {
        const userId = req.params.id;
        const user = req.body;
        await this.userService.update(userId, user);
        res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
      }
    }
  
    async deleteUser(req, res) {
      try {
        const userId = req.params.id;
        await this.userService.delete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
      }
    }
  }
  
  module.exports = UserController;
  