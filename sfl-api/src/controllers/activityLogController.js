const { ActivityLog } = require("../models/associations");
const asyncWrapper = require("../utils/asyncWrapper");
const HTTP_STATUS_CODES = require("../utils/statusCodes");

const createActivityLog = asyncWrapper(async (req, res, next) => {
    try {
        const { action, userId, timestamp } = req.body;

        if (!action || !userId || !timestamp) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Action, userId, and timestamp are required" });
        }

        const newActivityLog = await ActivityLog.create({
            action,
            userId,
            timestamp
        });
        return res.status(HTTP_STATUS_CODES.CREATED).json(newActivityLog);
    } catch (error) {
        console.error("Error creating activity log:", error);
        next(error); 
    }
});


// Get all activity logs
const getAllActivityLogs = asyncWrapper(async (req, res, next) => {
    try {
        const activityLogs = await ActivityLog.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(HTTP_STATUS_CODES.OK).json(activityLogs);
    } catch (error) {
        console.error("Error fetching activity logs:", error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch activity logs" });
    }
});

// Get an activity log by ID
const getActivityLogById = asyncWrapper(async (req, res, next) => {
    try {
        const activityLog = await ActivityLog.findByPk(req.params.id);
        if (!activityLog) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Activity log not found" });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(activityLog);
    } catch (error) {
        console.error("Error fetching activity log by ID:", error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch activity log by ID" });
    }
});

// Delete an activity log
const deleteActivityLog = asyncWrapper(async (req, res, next) => {
    try {
        const activityLog = await ActivityLog.findByPk(req.params.id);
        if (!activityLog) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Activity log not found" });
        }
        await activityLog.destroy();
        return res.status(HTTP_STATUS_CODES.OK).json({ message: "Activity log deleted successfully" });
    } catch (error) {
        console.error("Error deleting activity log:", error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete activity log" });
    }
});

module.exports = {
    createActivityLog,
    getAllActivityLogs,
    getActivityLogById,
    deleteActivityLog,
};
