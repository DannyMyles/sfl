const User = require("./userModel");
const Role = require("./rolesModel");
const Member = require("./memberModel");
const ActivityLog = require("./activityModels");

Role.hasMany(User, { foreignKey: "roleId", onDelete: "CASCADE" });
User.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(Member, { foreignKey: "userId", onDelete: "CASCADE" });
Member.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ActivityLog, { foreignKey: "userId", onDelete: "CASCADE" });
ActivityLog.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Role, Member, ActivityLog };
