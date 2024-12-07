const { User } = require("../models/associations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");
require('dotenv').config();
// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '@mu(H)adywawire199990wewire!';

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ userId: user.id, roleId: user.roleId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Register a new user
const registerUser = async (req, res, next) => {
    try {
      const { name, username, email, password, roleId } = req.body;
  
      // Check if roleId exists
      if (!roleId) {
        return res.status(400).json({ message: "Role ID is required" });
      }
  
      // Ensure the user does not already exist
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        roleId,
      });

      const token = generateToken(newUser);
  
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token
      });
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ message: "Invalid Role ID provided" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

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
