const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');
const { authenticate } = require('../middlewares/authMiddleware');

authRouter.post('/register',authController.registerUser);
authRouter.post('/login',authController.loginUser);
authRouter.get('/home', authenticate, (req, res) => {
  res.send('Welcome to the Home Page');
});

module.exports = authRouter;