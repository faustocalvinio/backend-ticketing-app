import { dbConnection } from "../database/dbConn";
import { EventSeed } from "../interfaces/event.interface";
import { Event } from "../models/Event";
import dotenv from "dotenv";
dotenv.config();
const seedEventsData: EventSeed[] = [
   {
      name: "Concierto de Rock Nacional",
      availableSeats: 100,
   },
   {
      name: "Teatro Musical",
      availableSeats: 50,
   },
   {
      name: "Conferencia de Tecnología",
      availableSeats: 200,
   },
   {
      name: "Exposición de Arte",
      availableSeats: 75,
   },
   {
      name: "Festival de Comida",
      availableSeats: 150,
   },
];

(async () => {
   try {
      await dbConnection();
      await Event.deleteMany({})
      const seedEvents = await Event.insertMany(seedEventsData);
      console.log("Datos de eventos sembrados:", seedEvents);
      process.exit(0);     
   } catch (error) {
      console.error("Error seeding data:", error);
   }
})();
