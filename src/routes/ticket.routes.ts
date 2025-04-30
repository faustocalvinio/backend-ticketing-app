import express from "express";
import {
   generateTicketWithoutSendingController,
   genTicketController,
   getAllTicketsController,
   getTicketByIdController,
   validateController,
} from "../controllers/ticket.controller";

export const ticketRouter = express.Router();

ticketRouter.post("/generate-ticket-pdf", genTicketController);
ticketRouter.get("/get-all-tickets", getAllTicketsController);
ticketRouter.get("/validate/:id", validateController);
ticketRouter.get("/id/:id", getTicketByIdController);
ticketRouter.post(
   "/generate-without-sending",
   generateTicketWithoutSendingController
);
