const express = require("express");
const cors = require("cors");
const { initConfig } = require("./app/config/config");
const initDB = require("./app/database/mysql");
const routes = require("./app/route/route");
const autoMigrate = require("./app/migrate/migrate");
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());
app.use(routes);

const startServer = async () => {
  try {
    await initDB();
    autoMigrate();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
