import express, { Request, Response } from "express";
import { Event } from "../models/Event";


export const eventRouter = express.Router();

eventRouter.post("/", async (req: any, res: any) => {
   const { name } = req.body;

   const newEvent = await Event.create({
      name,
   });
   res.status(201).send(newEvent);
});

eventRouter.get("/", async (req: Request, res: Response) => {
   const events = await Event.find();
   res.status(200).json(events);
});