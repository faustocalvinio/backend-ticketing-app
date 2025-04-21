import mongoose from "mongoose";
import { v4 } from "uuid";

const EventSchema = new mongoose.Schema({
   id: { type: String, default: () => v4() },
   name: { type: String, required: true },
});

export const Event = mongoose.model("Event", EventSchema);
