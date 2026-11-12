import { userService } from '../services/user.service';

const userController = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'User is not found' });
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ success: true, message: 'User is successfully deleted' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = userController;