const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./db/connect");
const rolesRoutes = require("./routes/rolesRoutes");
const membersRoutes = require("./routes/membersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const activityLogsRoutes = require("./routes/activityLogsRoutes");
const authRoutes = require("./routes/authRoutes");
const seedDatabase = require("./seeders/seed");
const path = require('path');
const fs = require('fs');
const HTTP_STATUS_CODES = require("./utils/statusCodes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const uploadDir = path.join(__dirname, '..' ,'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));


const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Application up and Running!");
});

// Register routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", rolesRoutes);
app.use("/api/v1", membersRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", activityLogsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong!" });
});

const server = async () => {
  try {
    await connectDB();

    // Sync database schema
    await sequelize.sync({ force: true });
    console.log("Database synced successfully.");

    // Seed the database
    await seedDatabase();

    // Start the server
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};

server();
