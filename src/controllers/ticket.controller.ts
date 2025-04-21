import { Ticket } from "../models/Ticket";
import { v4 } from "uuid";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import { getEventName } from "../helpers/eventName";

export const validateController = async (req: any, res: any) => {
   const { id } = req.params;
   const ticket = await Ticket.findOne({ id });
   if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
   }
   const eventName = await getEventName(ticket.eventId);

   if (ticket.used) {
      return res
         .status(400)
         .json({ message: "Ticket already used", eventName });
   }

   
   ticket.used = true;
   await ticket.save();

   return res.status(200).json({
      message: "Ticket is valid and now marked as used",
      ticket,
      eventName,
   });
};

export const genTicketController = async (req: any, res: any) => {
   const { email, eventId } = req.body;
   const id = v4();
   const eventName = await getEventName(eventId); 

   const ticket = new Ticket({ id, email, eventId });
   await ticket.save();

   const qrBuffer = await QRCode.toBuffer(id, { width: 300 });

   const doc = new PDFDocument({
      size: "A4",
      margin: 50,
   });

   res.setHeader("Content-Type", "application/pdf");
   res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${id}.pdf`
   );

   doc.pipe(res);

   doc.fontSize(24).text(`Entrada para el evento ${eventName}`, {
      align: "center",
   });

   doc.moveDown();

   doc.fontSize(16).text(`ID del ticket: ${id}`, { align: "center" });
   doc.text(`Email del asistente: ${email}`, {
      align: "center",
      underline: true,
   });

   doc.moveDown(2);

   const qrX = (doc.page.width - 300) / 2; // Centrar QR
   doc.image(qrBuffer, qrX, doc.y, { width: 300, height: 300 });

   doc.moveDown(20);
   doc.fontSize(14).text("Por favor presenta este QR al ingresar al evento.", {
      align: "center",
   });

   doc.end(); 
};
