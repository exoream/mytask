const express = require("express");
const cors = require('cors');
const { initConfig } = require("./app/config/config");
const initDB = require("./app/database/mysql");
const userRoutes = require("./app/route/route");
const { jwtMiddleware, createToken } = require("./utils/jwt/jwt");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
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

app.get('/generate-token', (req, res) => {
  const token = createToken(4, 'user');
  res.json({ token });
});

// Route yang dilindungi oleh middleware JWT
app.use('/protected', jwtMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

startServer();
