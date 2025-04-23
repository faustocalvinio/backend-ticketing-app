import { Event } from "../models/Event";

export const getEventName = async (eventId: string) => {
   const event = await Event.findOne({ id: eventId });
   if (!event) {
      return "Evento no encontrado";
   }

   return event.name;
};
