const { Role } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
// Create a new role
const createRole = asyncWrapper(async (req, res, next) => {
    const { name } = req.body;
    const newRole = await Role.create({
        name
    });
    return res.status(HTTP_STATUS_CODES.CREATED).json(newRole);
});
// Get all roles
const getAllRoles = asyncWrapper(async (req, res, next) => {
    const roles = await Role.findAll();
    return res.status(HTTP_STATUS_CODES.OK).json(roles);
});

// Get a role by ID
const getRoleById = asyncWrapper(async (req, res, next) => {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
    }
    return res.status(HTTP_STATUS_CODES.OK).json(role);
});

// Update a role
const updateRole = asyncWrapper(async (req, res, next) => {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
    }
    const { name } = req.body;
    await role.update({ name });
    return res.status(HTTP_STATUS_CODES.OK).json(role);
});

// Delete a role
const deleteRole = asyncWrapper(async (req, res, next) => {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Role not found" });
    }
    await role.destroy();
    return res.status(HTTP_STATUS_CODES.OK).json({ message: "Role deleted successfully" });
});

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};
