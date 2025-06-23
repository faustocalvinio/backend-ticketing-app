import express from "express";
import { Ticket } from "../models/Ticket";
import { qrBuilder } from "../helpers/qrBuilder";
import { getEventName } from "../helpers/eventName";
import { transporter } from "../helpers/emailTransponder";

export const paymentRouter = express.Router();

paymentRouter.post("/paypal/checkout/:ticketId", async (req: any, res: any) => {
   const { ticketId } = req.params;
   const ticketToChange = await Ticket.findOne({ id: ticketId });
   console.log("Ticket to change:", ticketToChange);
   if (!ticketToChange) {
      return res.status(404).send({ message: "Ticket not found" });
   }
   if (ticketToChange.isPaid) {
      return res.status(400).send({ message: "Ticket already paid" });
   }
   ticketToChange.isPaid = true;
   ticketToChange.paidAt = new Date();
   await ticketToChange.save();
   console.log("Payment details:", ticketId);
   res.setHeader("Content-Type", "application/pdf");
   res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${ticketId}.pdf`
   );
   const eventName = await getEventName(ticketToChange.eventId);
   const { id, email, area, seat } = ticketToChange;
   if (!email) {
      return res.status(400).send({ message: "Email not provided" });
   }
   const { doc } = await qrBuilder(id, email, eventName, area, seat!);

   doc.pipe(res);

   const pdfBuffers: Buffer[] = [];
   doc.on("data", (chunk) => pdfBuffers.push(chunk));
   doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(pdfBuffers);

      // if (sendEmail) {
      console.log("Sending email to", email);

      await transporter.sendMail({
         from: process.env.EMAIL_USER,
         to: email,
         subject: `Your Ticket for ${eventName}`,
         text: `Your ticket for ${eventName} is attached. Your seat is ${seat}.`,
         attachments: [
            {
               filename: `ticket-${id}.pdf`,
               content: pdfBuffer,
               contentType: "application/pdf",
            },
         ],
      });
   });

   // res.send({ message: "Payment processed successfully", ticketToChange });
});
