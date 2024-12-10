const bcrypt = require("bcrypt");
const { User, Role, Member, ActivityLog } = require("../models/associations");

const seedDatabase = async () => {
  try {
    await Role.sync({ force: true });
    await User.sync({ force: true });
    await Member.sync({ force: true });
    await ActivityLog.sync({ force: true });

    const roles =  await Role.bulkCreate([
      { id: 1, name: "admin" },
      { id: 2, name: "user" },
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
        name: "Brian Gathua",
        email: "gathua@gmail.com",
        dob: "1990-01-01",
        profilePicture: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        userId: users[0].id,
      },
      {
        name: "Mary Symons",
        email: "marysymons@gmail.com",
        dob: "1985-05-15",
        profilePicture: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
