const { ActivityLog } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");

// Create a new activity log
const createActivityLog = asyncWrapper(async (req, res, next) => {
    const { action, userId, timestamp } = req.body;
    const newActivityLog = await ActivityLog.create({
        action,
        userId,
        timestamp
    });
    return res.status(HTTP_STATUS_CODES.CREATED).json(newActivityLog);
});

// Get all activity logs
const getAllActivityLogs = asyncWrapper(async (req, res, next) => {
    const activityLogs = await ActivityLog.findAll();
    return res.status(HTTP_STATUS_CODES.OK).json(activityLogs);
});

// Get an activity log by ID
const getActivityLogById = asyncWrapper(async (req, res, next) => {
    const activityLog = await ActivityLog.findByPk(req.params.id);
    if (!activityLog) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Activity log not found" });
    }
    return res.status(HTTP_STATUS_CODES.OK).json(activityLog);
});

// Delete an activity log
const deleteActivityLog = asyncWrapper(async (req, res, next) => {
    const activityLog = await ActivityLog.findByPk(req.params.id);
    if (!activityLog) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Activity log not found" });
    }
    await activityLog.destroy();
    return res.status(HTTP_STATUS_CODES.OK).json({ message: "Activity log deleted successfully" });
});

module.exports = {
    createActivityLog,
    getAllActivityLogs,
    getActivityLogById,
    deleteActivityLog,
};
