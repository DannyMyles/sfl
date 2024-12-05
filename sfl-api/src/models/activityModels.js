const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");
const ActivityLog = sequelize.define("ActivityLog", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: uuidv4, 
    primaryKey: true, 
  },
  userId: { type: DataTypes.UUID, 
    defaultValue: uuidv4, 
    primaryKey: true,  },
  action: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = ActivityLog;
