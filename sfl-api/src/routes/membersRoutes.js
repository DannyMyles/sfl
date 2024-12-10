// memberRoutes.js

const express = require('express');
const router = express.Router();
const { getAllMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');
const multerErrorHandler = require('../middlewares/multerErrorHandler');
const { logActivity } = require('../middlewares/logActivityMiddleware');

// Member Routes
router.route('/members')
    .post(authenticateUser, upload.single('file'), createMember, multerErrorHandler, logActivity('Created member'))  
    .get(authenticateUser, getAllMembers);

router.route('/members/:id')
    .put(authenticateUser, upload.single('file'), updateMember, logActivity('Updated member')) 
    .delete(authenticateUser, deleteMember, logActivity('Deleted member')) 

module.exports = router;
