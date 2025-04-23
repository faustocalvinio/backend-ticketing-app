import { Ticket } from "../models/Ticket";
import { v4 } from "uuid";
import { getEventName } from "../helpers/eventName";
import { qrBuilder } from "../helpers/qrBuilder";
import { updateSeats } from "../helpers/updateSeats";

export const validateController = async (req: any, res: any) => {
   const { id } = req.params;
   const ticket = await Ticket.findOne({ id });
   if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
   }
   const eventName = await getEventName(ticket.eventId);

   if (ticket.used) {
      return res.status(400).json({
         message: "Ticket already used",
         eventName,
         email: ticket.email,
      });
   }

   ticket.used = true;
   await ticket.save();

   return res.status(200).json({
      message: "Ticket is valid and now marked as used",
      ticket,
      email: ticket.email,
      eventName,
   });
};

export const genTicketController = async (req: any, res: any) => {
   const { email, eventId, area } = req.body;
   const id = v4();
   const eventName = await getEventName(eventId);
   // const area = req.body.area || "General";
   const { count } = await updateSeats(eventId);
   const seat = `${count}A`;
   const ticket = new Ticket({ id, email, eventId, area, seat });
   await ticket.save();

   res.setHeader("Content-Type", "application/pdf");
   res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${id}.pdf`
   );
   const { doc } = await qrBuilder(id, email, eventName, area, seat);

   doc.pipe(res);
};

export const getAllTicketsController = async (req: any, res: any) => {
   const tickets = await Ticket.find({});
   if (!tickets) {
      return res.status(404).json({ message: "No tickets found" });
   }
   return res.status(200).json({
      message: `${tickets.length} Tickets found`,
      tickets,
   });
};

export const getTicketByIdController = async (req: any, res: any) => {
   const { id } = req.params;
   const ticket = await Ticket.findOne({
      id,
   });
   if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
   }
   const eventName = await getEventName(ticket.eventId);
   return res.status(200).json({
      message: "Ticket found",
      ticket,
      eventName,
   });
};
