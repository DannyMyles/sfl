const express = require('express');
const router = express.Router();
const { createUser ,getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Protected routes for users
router.route('/users')
  .get(authenticateUser, getAllUsers)
  .post(authenticateUser, createUser)

router.route('/users/:id')
  .get(authenticateUser, getUserById)
  .put(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser)

module.exports = router;
