const express = require('express');
require('dotenv').config();
const connectMongoDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { connect } = require('mongoose');

const app = express();
app.use(express.json());
const PORT = process.env.PORT||3000;
connectMongoDB();
// Cors
app.use(cors({
  origin: [
    'http://localhost:5173'
  ],
  credentials: true
}));
//Routes (end points)
app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
  console.log(`Server is listening on Port ${PORT}`);
})