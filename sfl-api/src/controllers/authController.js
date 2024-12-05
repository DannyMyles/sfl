const { User } = require("../models/associations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '@mu(H)adywawire199990wewire!';

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ userId: user.id, roleId: user.roleId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Register a new user
const registerUser = asyncWrapper(async (req, res, next) => {
    const { name, username, email, password, roleId } = req.body;

    // Input validation
    if (!name || !email || !password) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: "Name, email, and password are required.",
        });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(HTTP_STATUS_CODES.CONFLICT).json({ error: "User already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            id: uuidv4(), 
            name,
            username,
            email,
            password: hashedPassword,
            roleId,
        });

        // Generate JWT token
        const token = generateToken(newUser);

        return res.status(HTTP_STATUS_CODES.CREATED).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                roleId: newUser.roleId,
            },
            token,
        });
    } catch (error) {
        console.error("Database error:", error.message, error.stack);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            error: `Error registering user. Please try again later.`,
        });
    }
});


// Login a user
const loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(HTTP_STATUS_CODES.OK).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token,
    });
});

// Logout a user (Invalidate token)
const logoutUser = asyncWrapper(async (req, res, next) => {
    return res.status(HTTP_STATUS_CODES.OK).json({ message: "Logged out successfully" });
});

// Get current user details (requires authentication)
const getCurrentUser = asyncWrapper(async (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "User ID not found in request" });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
        }

        return res.status(HTTP_STATUS_CODES.OK).json(user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "An error occurred while fetching user details" });
    }
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
