import express from "express";
import { dbConnection } from "./database/dbConn";
import { ticketRouter } from "./routes/ticket.routes";
import { eventRouter } from "./routes/event.routes";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

dbConnection();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/tickets", ticketRouter);
app.use("/api/events", eventRouter);

app.get("/client/validate", (req, res) => {
   res.sendFile(path.join(__dirname, "../public/validate.html"));
});

app.get("/client/events", (req, res) => {
   res.sendFile(path.join(__dirname, "../public/events.html"));
});

app.get("/client/generate", (req, res) => {
   res.sendFile(path.join(__dirname, "../public/generate.html"));
});

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
