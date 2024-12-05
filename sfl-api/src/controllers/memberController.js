const { Member, User } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
const path = require('path');
const { v4: uuidv4 } = require("uuid");
// Create a new member
const createMember = asyncWrapper(async (req, res, next) => {
    const { name, email, roleId, dob, userId } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Invalid user ID" });
    }

    const profilePicture = path.join('uploads', req.file.filename);
    const newMember = await Member.create({
        id: uuidv4(),
        name,
        email,
        roleId,
        dob,
        userId,
        profilePicture,
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json(newMember);
});


// Get all members
const getAllMembers = asyncWrapper(async (req, res, next) => {
    const members = await Member.findAll();
    return res.status(HTTP_STATUS_CODES.OK).json(members);
});

// Get a member by ID
const getMemberById = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }
    return res.status(HTTP_STATUS_CODES.OK).json(member);
});

// Update a member
const updateMember = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }
    const { name, email, roleId } = req.body;
    await member.update({ name, email, roleId });
    return res.status(HTTP_STATUS_CODES.OK).json(member);
});

// Delete a member
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
