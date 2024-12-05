const express = require('express');
const router = express.Router();
const { getAllRoles, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Protected routes for roles
router.route('/roles')
  .get(authenticateUser, getAllRoles)
  .post(authenticateUser, createRole)   
  
router.route('/roles/:id')
  .put(authenticateUser, updateRole)     
  .delete(authenticateUser, deleteRole);

module.exports = router;
