
const ActivityLog = require("../models/activityModels");
const HTTP_STATUS_CODES = require("../utils/statusCodes");

const logActivity = (action) => {
    return async (req, res, next) => {
      const userId = req.body.userId || req.userId;
  
      if (!userId) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "userId is required for activity logging" });
      }
  
      try {
        await ActivityLog.create({
          action,
          userId,
          timestamp: new Date(),
        });
  
        next();
      } catch (error) {
        console.error("Error logging activity:", error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to log activity" });
      }
    };
  };
  

module.exports = { logActivity };
