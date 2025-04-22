import mongoose from "mongoose";

export const dbConnection = () => {
   mongoose.connect("mongodb://root:example@localhost:27017/ticketing-app?authSource=admin");
};
