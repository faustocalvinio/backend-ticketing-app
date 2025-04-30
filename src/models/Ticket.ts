import mongoose from "mongoose";
import { v4 } from "uuid";

const TicketSchema = new mongoose.Schema({
   id: { type: String, required: false, default: () => v4() },
   email: String,
   used: { type: Boolean, default: false },
   area: {
      type: String,
      enum: ["General", "VIP", "UltraVIP"],
      default: "General",
   },
   seat: String,
   eventId: { type: String, required: true },
   isPaid: { type: Boolean, default: false },
   paidAt: { type: Date, default: null },
   createdAt: { type: Date, default: Date.now() },
});

export const Ticket = mongoose.model("Ticket", TicketSchema);
