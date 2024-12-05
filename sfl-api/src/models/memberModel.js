const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");
const Member = sequelize.define("Member", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: uuidv4, 
    primaryKey: true, 
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  profilePicture: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.UUID, 
    defaultValue: uuidv4, 
    primaryKey: true, },
});

module.exports = Member;
