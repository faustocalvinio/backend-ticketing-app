import { Event } from "../models/Event";

export const updateSeats = async (eventId: string) => {
   const event = await Event.findOne({
      id: eventId,
   });
   if (!event) {
      return {
         message: "Evento no encontrado",
      };
   }
   const assignedSeat = event.availableSeats;
   event.availableSeats -= 1;
   await event.save();

   return {
      count: assignedSeat,
      message: `Asiento ${event.availableSeats} reservado`,
   };
};
