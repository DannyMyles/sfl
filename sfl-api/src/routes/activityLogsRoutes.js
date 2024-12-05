const express = require('express');
const router = express.Router();
const { getAllActivityLogs, getActivityLogById, createActivityLog } = require('../controllers/activityLogController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Protected routes for activity logs
router.route('/activity')
  .get(authenticateUser, getAllActivityLogs) 
  .post(authenticateUser, createActivityLog); 

router.route('/activity/:id')
  .get(authenticateUser, getActivityLogById);

module.exports = router;