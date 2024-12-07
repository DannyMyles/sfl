const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Member = sequelize.define("Member", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  profilePicture: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Users", key: "id" } },
});

module.exports = Member;