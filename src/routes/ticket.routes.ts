import express from "express";
import {
   genTicketGetController,
   genTicketPostController,
   validateController,
} from "../controllers/ticket.controller";

export const ticketRouter = express.Router();

ticketRouter.get("/generate-ticket-pdf", genTicketGetController);
ticketRouter.post("/generate-ticket-pdf", genTicketPostController);

ticketRouter.get("/validate/:id", validateController);
