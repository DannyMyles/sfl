const express = require('express');
const router = express.Router();
const { getAllMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');
const multerErrorHandler = require('../middlewares/multerErrorHandler'); 

// Protected routes for members
router.route('/members')
    .post(authenticateUser, upload.single('profilePicture'), createMember, multerErrorHandler)
    .get(authenticateUser, getAllMembers);

router.route('/members/:id')
    .put(authenticateUser, updateMember)
    .delete(authenticateUser, deleteMember);

module.exports = router;
