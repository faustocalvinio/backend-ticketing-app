import express from "express";
import {
   genTicketController,
   validateController,
} from "../controllers/ticket.controller";

export const ticketRouter = express.Router();

ticketRouter.post("/generate-ticket-pdf", genTicketController);

ticketRouter.get("/validate/:id", validateController);
