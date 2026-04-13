import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (err) {
    isConnected = false;
  }
};

export const isMongoDBConnected = () => isConnected;

export default connectDB;