import mongoose from "mongoose";
// zd38WgZuGChYGxuI
// mongodb+srv://hardikkanzariya091:zd38WgZuGChYGxuI@cluster0.iokmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1);
  }
};
