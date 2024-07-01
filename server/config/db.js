const mongoose = require('mongoose');
require('dotenv').config();

const connectString = process.env.MONGO_URL;
const connectMongoDB = async()=>{
  try
  {
    await mongoose.connect(connectString);
    console.log("Successfully Connected to MongoDB");
  }
  catch(error)
  {
    console.error('Error Connecting to DB: ',error.message);
    process.exit(1);
  }
}

module.exports = connectMongoDB;