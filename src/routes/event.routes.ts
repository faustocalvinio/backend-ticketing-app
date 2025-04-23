import express, { Request, Response } from "express";
import { Event } from "../models/Event";
import { deleteEvent, getAllEvents } from "../controllers/event.controller";

export const eventRouter = express.Router();

eventRouter.post("/", async (req: any, res: any) => {
   const { name } = req.body;

   const newEvent = await Event.create({
      name,
   });
   res.status(201).send(newEvent);
});

eventRouter.get("/", async (req: Request, res: Response) => {
   const { events } = await getAllEvents();
   res.status(200).json(events);
});
eventRouter.delete("/:id", async (req: Request, res: Response) => {
   const { id } = req.params;
   const resp = await deleteEvent(id);

   res.status(200).json(resp);
});
