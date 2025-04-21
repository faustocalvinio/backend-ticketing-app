import { Event } from "../models/Event";

export const getEventName = async(eventId: string) => {
   
   
   const event = await Event.findOne({ id: eventId });
    if (!event) {
        throw new Error("Evento no encontrado");
    }
    
    return event.name;

   
}