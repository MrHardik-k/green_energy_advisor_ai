import mongoose from "mongoose";
require('dotenv').config();
// greenenergy69        pass: wewillwin3lakh
// MONGO_URI=mongodb+srv://greenenergy69:wewilwin3lakh@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority  
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1);
  }
};
