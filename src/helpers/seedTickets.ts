import { dbConnection } from "../database/dbConn";
import dotenv from "dotenv";
import { Ticket } from "../models/Ticket";
dotenv.config();

const seedTicketsData = [
   {
      email: "user1@example.com",
      eventId: "event1",
      area: "VIP",
      seat: "1A",
      isPaid: true,
      used: false,
   },
   {
      email: "user2@example.com",
      eventId: "event2",
      area: "General",
      seat: "2B",
      isPaid: false,
      used: false,
   },
   {
      email: "user3@example.com",
      eventId: "event3",
      area: "VIP",
      seat: "1C",
      isPaid: true,
      used: true,
   },
];

(async () => {
   try {
      await dbConnection();
      await Ticket.deleteMany({});
      const seedTickets = await Ticket.insertMany(seedTicketsData);
      console.log("Seeded ticket data:", seedTickets);
      process.exit(0);
   } catch (error) {
      console.error("Error seeding data:", error);
   }
})();
