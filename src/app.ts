import express from "express";
import { dbConnection } from "./database/dbConn";
import { ticketRouter } from "./routes/ticket.routes";
import { eventRouter } from "./routes/event.routes";
import cors from "cors";

dbConnection();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/tickets", ticketRouter);
app.use("/api/events", eventRouter);

app.get("/client/validate", (req, res) => {
   res.sendFile(__dirname + "/public/validate.html");
});

app.get("/client/generate", (req, res) => {
   res.sendFile(__dirname + "/public/generate.html");
});

app.listen(3000, () => {
   console.log("Servidor en http://localhost:3000");
});


