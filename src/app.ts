import express from "express";
import { dbConnection } from "./database/dbConn";
import { ticketRouter } from "./routes/ticket.routes";
import { eventRouter } from "./routes/event.routes";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { paymentRouter } from "./routes/payments.routes";
dotenv.config();

dbConnection();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/tickets", ticketRouter);
app.use("/api/events", eventRouter);
app.use("/api/payments", paymentRouter);
app.get("/client/validate", (req, res) => {
   res.sendFile(path.join(__dirname, "../public/validate.html"));
})
app.listen(process.env.PORT || 3000, () => {
   console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
