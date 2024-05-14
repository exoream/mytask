const express = require("express");
const { initConfig } = require("./app/config/config");
const initDB = require("./app/database/mysql");
const userRoutes = require("./app/route/route");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/', userRoutes);

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
