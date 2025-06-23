import express from "express";
import {
   generateTicketWithoutSendingPDFController,
   genTicketController,
   getAllTicketsController,
   getTicketByIdController,
   validateTicketController,
} from "../controllers/ticket.controller";

export const ticketRouter = express.Router();

ticketRouter.post("/generate-ticket-pdf", genTicketController);
ticketRouter.get("/get-all-tickets", getAllTicketsController);
ticketRouter.get("/validate/:id", validateTicketController);
ticketRouter.get("/id/:id", getTicketByIdController);
ticketRouter.post(
   "/generate-without-sending",
   generateTicketWithoutSendingPDFController
);
