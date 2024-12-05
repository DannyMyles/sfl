const bcrypt = require("bcrypt");
const { User, Role, Member, ActivityLog } = require("../models/associations");

const seedDatabase = async () => {
  try {
    // Ensure the database is synced
    await User.sync();
    await Role.sync();
    await Member.sync();
    await ActivityLog.sync();

    // Seed roles
    const roles = await Role.bulkCreate([
      { name: "Admin" },
      { name: "User" },
      { name: "Editor" },
    ], { validate: true });

    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password123", 10);

    // Seed users
    const users = await User.bulkCreate([
      {
        name: "Muhadi Wawire",
        username: "muhadi",
        email: "muhadidany@gmail.com",
        password: hashedPassword1,
        roleId: roles[0].id,
      },
      {
        name: "Mark Sila",
        username: "marksila",
        email: "marksila@example.com",
        password: hashedPassword2,
        roleId: roles[1].id,
      },
    ], { validate: true });

    console.log(users); // Check user IDs

    // Seed members with valid userId references
    const members = await Member.bulkCreate([
      {
        name: "John ",
        email: "gathua@gmail.com",
        dob: "1990-01-01",
        profilePicture: "profile_brian.jpg",
        userId: users[0].id,
      },
      {
        name: "Mary SS",
        email: "jane@gmail.com",
        dob: "1985-05-15",
        profilePicture: "profile_mary.jpg",
        userId: users[1].id, 
      },
    ], { validate: true });

    // Seed activity logs
    const activityLogs = await ActivityLog.bulkCreate([
      { action: "Logged In", userId: users[0].id },
      { action: "Created a post", userId: users[1].id },
    ], { validate: true });

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
