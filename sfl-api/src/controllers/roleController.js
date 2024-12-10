const { Role } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");

// Create a new role
const createRole = asyncWrapper(async (req, res, next) => {
    const { name } = req.body;
    
    try {
        const newRole = await Role.create({ name });
        return res.status(HTTP_STATUS_CODES.CREATED).json(newRole);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors });
        }
        next(err);
    }
});

// Get all roles
const getAllRoles = asyncWrapper(async (req, res, next) => {
    try {
        const roles = await Role.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(HTTP_STATUS_CODES.OK).json(roles);
    } catch (err) {
        next(err);
    }
});

// Get a role by ID
const getRoleById = asyncWrapper(async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(role);
    } catch (err) {
        next(err);
    }
});

// Update a role
const updateRole = asyncWrapper(async (req, res, next) => {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
    }

    const { name } = req.body;

    try {
        await role.update({ name });
        return res.status(HTTP_STATUS_CODES.OK).json(role);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors });
        }
        next(err);
    }
});

// Delete a role
const deleteRole = asyncWrapper(async (req, res, next) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
        }
        await role.destroy();
        return res.status(HTTP_STATUS_CODES.OK).json({ message: "Role deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};
