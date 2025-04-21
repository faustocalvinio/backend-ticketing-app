import express from "express";
import { dbConnection } from "./database/dbConn";
import { ticketRouter } from "./routes/ticket.routes";

dbConnection();

const app = express();

app.use(express.json());

app.use("/api/tickets", ticketRouter);

app.get("/client/validate", (req, res) => {
   res.sendFile(__dirname + "/public/validate.html");
});


app.listen(3000, () => {
   console.log("Servidor en http://localhost:3000");
});


// app.post("/generate-ticket-png", async (req, res) => {
//    const { email } = req.body;
//    const id = v4();
//    const ticket = new Ticket({ id, email });
//    await ticket.save();

//    const buffer = await QRCode.toBuffer(id);

//    res.setHeader("Content-Type", "image/png");
//    res.send(buffer);
// });

// app.use(ticketRouter);
