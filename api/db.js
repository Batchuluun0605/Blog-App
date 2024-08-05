import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.NEXT_DB_CONNECT_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
