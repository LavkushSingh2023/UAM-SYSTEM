require("dotenv").config();
const express = require("express");
const AppDataSource = require("./data-source");
const authRoutes = require("./routes/authRoutes");
const softwareRoutes = require("./routes/softwareRoutes");
const requestRoutes = require("./routes/requestRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const app = express();
    app.use(express.json());

    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );
    
    app.use("/api/auth", authRoutes);
    app.use("/api/software", softwareRoutes);
    app.use("/api/requests", requestRoutes);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
