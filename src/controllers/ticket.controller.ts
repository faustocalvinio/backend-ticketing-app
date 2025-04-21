import { Ticket } from "../models/Ticket";
import { v4 } from "uuid";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
export const validateController = async (req: any, res: any) => {
   const { id } = req.params;
   const ticket = await Ticket.findOne({ id });

   if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
   }

   if (ticket.used) {
      return res.status(400).json({ message: "Ticket already used" });
   }

   // 🟢 Marcar como usado
   ticket.used = true;
   await ticket.save();

   return res
      .status(200)
      .json({ message: "Ticket is valid and now marked as used", ticket });
};

export const genTicketPostController = async (req: any, res: any) => {
   const { email } = req.body;
   const id = v4();

   const ticket = new Ticket({ id, email });
   await ticket.save();

   // Generar el QR como buffer
   const qrBuffer = await QRCode.toBuffer(id, { width: 300 });

   // Crear PDF
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

   // Título
   doc.fontSize(24).text("Entrada para el evento", {
      align: "center",
   });

   doc.moveDown();

   // Texto personalizado
   doc.fontSize(16).text(`ID del ticket: ${id}`, { align: "center" });
   doc.text(`Email del asistente: ${email}`, { align: "center" });

   doc.moveDown(2);

   // Agregar el QR en el centro
   const qrX = (doc.page.width - 300) / 2; // Centrar QR
   doc.image(qrBuffer, qrX, doc.y, { width: 300, height: 300 });

   doc.moveDown(20);
   doc.fontSize(14).text("Por favor presenta este QR al ingresar al evento.", {
      align: "center",
   });

   doc.end(); // Finalizar el documento
};
export const genTicketGetController = async (req: any, res: any) => {
   // const { email } = req.body;
   const id = v4();
   const email = req.query.email as string; // Cambia esto para obtener el email desde la query
   const ticket = new Ticket({ id, email });
   await ticket.save();

   // Generar el QR como buffer
   const qrBuffer = await QRCode.toBuffer(id, { width: 300 });

   // Crear PDF
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

   // Título
   doc.fontSize(24).text("Entrada para el evento", {
      align: "center",
   });

   doc.moveDown();

   // Texto personalizado
   doc.fontSize(16).text(`ID del ticket: ${id}`, { align: "center" });
   doc.text(`Email del asistente: ${email}`, { align: "center" });

   doc.moveDown(2);

   // Agregar el QR en el centro
   const qrX = (doc.page.width - 300) / 2; // Centrar QR
   doc.image(qrBuffer, qrX, doc.y, { width: 300, height: 300 });

   doc.moveDown(20);
   doc.fontSize(14).text("Por favor presenta este QR al ingresar al evento.", {
      align: "center",
   });

   doc.end(); // Finalizar el documento
};
