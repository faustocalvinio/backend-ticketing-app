import mongoose from "mongoose";
import { v4 } from "uuid";

const EventSchema = new mongoose.Schema({
   id: { type: String, default: () => v4() },
   name: { type: String, required: true },
   availableSeats: { type: Number, required: true, default: 100 },
});

export const Event = mongoose.model("Event", EventSchema);
