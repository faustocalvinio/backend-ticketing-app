import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
   id: { type: String, required: true, unique: true },
   email: String,
   used: { type: Boolean, default: false },
   area: {
      type: String,
      enum: ["General", "VIP", "UltraVIP"],
      default: "General",
   },
   seat: String,
   eventId: { type: String, required: true },
});

export const Ticket = mongoose.model("Ticket", TicketSchema);
