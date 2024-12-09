const { User, Role } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");

// Create a new user
const createUser = asyncWrapper(async (req, res, next) => {
    const { name, username, email, password, roleId } = req.body;

    // Check if the role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Invalid role ID" });
    }

    const newUser = await User.create({ name, username, email, password, roleId });
    return res.status(HTTP_STATUS_CODES.CREATED).json(newUser);
});


// Get all users
const getAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.findAll({
        order: [['createdAt', 'DESC']],
    });
    return res.status(HTTP_STATUS_CODES.OK).json(users);
});


// Get a single user by ID
const getUserById = asyncWrapper(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    }
    return res.status(HTTP_STATUS_CODES.OK).json(user);
});

// Update a user
const updateUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    }
    const { name, username, email, password, roleId } = req.body;
    await user.update({ name, username, email, password, roleId });
    return res.status(HTTP_STATUS_CODES.OK).json(user);
});

// Delete a user
const deleteUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    }
    await user.destroy();
    return res.status(HTTP_STATUS_CODES.OK).json({ message: "User deleted successfully" });
});

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
