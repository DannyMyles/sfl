const bcrypt = require("bcrypt");
const { User, Role, Member, ActivityLog } = require("../models/associations");

const seedDatabase = async () => {
  try {
    await Role.sync({ force: true });
    await User.sync({ force: true });
    await Member.sync({ force: true });
    await ActivityLog.sync({ force: true });

    const roles =  await Role.bulkCreate([
      { id: 1, name: "Admin" },
      { id: 2, name: "User" },
    ]);

    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password123", 10);

    const users = await User.bulkCreate([
      {
        name: "Muhadi Wawire",
        username: "muhadi",
        email: "muhadidany@gmail.com",
        password: hashedPassword1,
        roleId: 1,
      },
      {
        name: "Mark Sila",
        username: "marksila",
        email: "marksila@example.com",
        password: hashedPassword2,
        roleId: 2, 
      },
    ]);

    const members = await Member.bulkCreate([
      {
        name: "John",
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
    ]);

    const activityLogs = await ActivityLog.bulkCreate([
      { action: "Logged In", userId: users[0].id },
      { action: "Created a post", userId: users[1].id },
    ]);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
