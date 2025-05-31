const userService = require('../services/userService');

// userController.js
let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();
    return res.json({ errCode: 0, users: users });
};

let handleCreateNewUser = async (req, res) => {
    let data = req.body;
    let result = await userService.createNewUser(data);
    return res.json(result);
};

module.exports = {
    handleGetAllUsers,
    handleCreateNewUser
};