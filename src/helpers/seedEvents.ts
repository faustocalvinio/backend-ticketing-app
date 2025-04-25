import { dbConnection } from "../database/dbConn";
import { EventSeed } from "../interfaces/event.interface";
import { Event } from "../models/Event";
import dotenv from "dotenv";
dotenv.config();
const seedEventsData: EventSeed[] = [
   {
      name: "Concierto de Rock Nacional",
      availableSeats: 100,
      price: 50,
   },
   {
      name: "Teatro Musical",
      availableSeats: 50,
      price: 40,
   },
   {
      name: "Conferencia de Tecnología",
      availableSeats: 200,
      price: 30,
   },
   {
      name: "Exposición de Arte",
      availableSeats: 75,
      price: 20,
   },
   {
      name: "Festival de Comida",
      availableSeats: 150,
      price: 25, 
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
