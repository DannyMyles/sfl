const { Member, User } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
const path = require('path');

const createMember = asyncWrapper(async (req, res, next) => {
    const { name, email, roleId, dob, userId } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Invalid user ID" });
    }

    if (!req.file) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "No file uploaded" });
    }

    // Save the public URL for the uploaded file
    const profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    try {
        const newMember = await Member.create({
            name,
            email,
            roleId,
            dob,
            userId,
            profilePicture,
        });

        return res.status(HTTP_STATUS_CODES.CREATED).json(newMember);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors });
        }
        next(err);
    }
});

const getAllMembers = asyncWrapper(async (req, res, next) => {
    const members = await Member.findAll({
        order: [['createdAt', 'DESC']],
    });
    return res.status(HTTP_STATUS_CODES.OK).json(members);
});

const getMemberById = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }
    return res.status(HTTP_STATUS_CODES.OK).json(member);
});

const updateMember = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }
    const { name, email, roleId } = req.body;
    await member.update({ name, email, roleId });
    return res.status(HTTP_STATUS_CODES.OK).json(member);
});

const deleteMember = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }
    await member.destroy();
    return res.status(HTTP_STATUS_CODES.OK).json({ message: "Member deleted successfully" });
});

module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};