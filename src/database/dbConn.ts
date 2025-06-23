import mongoose from "mongoose";

export const dbConnection = () => {
   mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ticketing"
   );
};
