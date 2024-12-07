const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const ActivityLog = sequelize.define("ActivityLog", {
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Users", key: "id" } },
  action: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = ActivityLog;
