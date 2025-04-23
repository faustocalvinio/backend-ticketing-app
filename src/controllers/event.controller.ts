import { Event } from "../models/Event";

export const getAllEvents = async () => {
   const events = await Event.find();

   if (!events) {
      return {
         events: [],
      };
   }

   return { events };
};

export const deleteEvent = async (eventId: string) => {
   const event = await Event.findOne({ id: eventId });
   if (!event) {
      return {
         message: "Evento no encontrado",
      };
   }
   await Event.deleteOne({ id: eventId });
   return {
      message: `Evento ${event.name} eliminado`,
   };
};
