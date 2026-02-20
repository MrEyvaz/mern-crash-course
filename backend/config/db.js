import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log("db failed to connect", error);
    process.exit(1)
  }
};