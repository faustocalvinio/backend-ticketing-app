import { Event } from "../models/Event";

export const getEventName = async (eventId: string) => {
   const event = await Event.findOne({ id: eventId });
   if (!event) {
      return "Event not found";
   }

   return event.name;
};
