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

      // Check if required fields are present
      if (!name || !username || !email || !password || !roleId) {
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "All fields are required" });
      }

      // Check if email or username already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "User with this email already exists" });
      }

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Username is already taken" });
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

      // Fetch the role details
      const userWithRole = await User.findByPk(newUser.id, { include: 'Role' });

      const token = generateToken(newUser);

      return res.status(HTTP_STATUS_CODES.CREATED).json({
          message: "User registered successfully",
          user: {
              id: userWithRole.id,
              name: userWithRole.name,
              email: userWithRole.email,
              role: userWithRole.Role.name,
              token: token,
          },
      });
  } catch (error) {
      console.error("Error registering user:", error);
      if (error.name === "SequelizeForeignKeyConstraintError") {
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "Invalid Role ID provided" });
      }
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// Login a user
const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Email and Password are required" });
  }

  const user = await User.findOne({ where: { email }, include: 'Role' });
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
      user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.Role.name,
          token: token,
      },
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
      const user = await User.findByPk(userId, { include: 'Role' });
      if (!user) {
          return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "User not found" });
      }

      return res.status(HTTP_STATUS_CODES.OK).json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.Role.name,
      });
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
