const service = require("../services/blogServiceImp");

class UserController {
    constructor(service) {
        this.service = service;
    }

    async getUsers(req, res) {
        try {
            const users = await this.service.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async createUser(req, res) { 
        try {
            const user = await this.service.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id; 
            const user = await this.service.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = await this.service.updateUser(userId, req.body);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await this.service.deleteUser(userId);
            if (deletedUser) {
                res.status(200).json({ success: true, message: "User deleted successfully" });
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

const controller = new UserController(service);
module.exports = controller;
