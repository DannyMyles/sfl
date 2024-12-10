const { Member, User } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
const path = require('path');
const fs = require('fs');

// Create a new member
const createMember = asyncWrapper(async (req, res, next) => {
    const { name, email, roleId, dob, userId } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Invalid user ID" });
        }

        if (!req.file) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "No file uploaded" });
        }

        const profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const newMember = await Member.create({
            name,
            email,
            roleId,
            dob,
            userId,
            profilePicture,
        });

        // Log activity for creating member
        req.body.action = 'Created member'; 
        next();

        return res.status(HTTP_STATUS_CODES.CREATED).json(newMember);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors });
        }
        next(err);
    }
});

// Get all members
const getAllMembers = asyncWrapper(async (req, res, next) => {
    try {
        const members = await Member.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(HTTP_STATUS_CODES.OK).json(members);
    } catch (err) {
        next(err);
    }
});

// Update a member
const updateMember = asyncWrapper(async (req, res, next) => {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
    }

    const { name, email, roleId } = req.body;
    let profilePicture = member.profilePicture;

    try {
        if (req.file) {
            const oldFilePath = path.join(__dirname, '..', 'uploads', path.basename(member.profilePicture));
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }

            profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        await member.update({
            name,
            email,
            roleId,
            profilePicture,
        });

        req.body.action = 'Updated member'; 
        next();

        return res.status(HTTP_STATUS_CODES.OK).json(member);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(error => error.message);
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors });
        }
        next(err);
    }
});

// Delete a member
const deleteMember = asyncWrapper(async (req, res, next) => {
    try {
        console.log("Deleting member with ID:", req.params.id);
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            console.log("Member not found");
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Member not found" });
        }

        // Proceed with deletion
        await member.destroy();

        console.log("Member deleted successfully");
        
        req.body.action = 'Deleted member';
        next(); 
        // Send the response after the deletion is completed
        return res.status(HTTP_STATUS_CODES.OK).json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error("Error deleting member:", err);
        next(err);
    }
});


module.exports = {
    createMember,
    getAllMembers,
    updateMember,
    deleteMember,
};
