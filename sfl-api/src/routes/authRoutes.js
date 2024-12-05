const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Protected routes
router.route('/profile').get(authenticateUser, getCurrentUser);
router.route('/logout').post(authenticateUser, logoutUser);

module.exports = router;
