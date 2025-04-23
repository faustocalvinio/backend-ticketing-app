import QRCode from "qrcode";
import PDFDocument from "pdfkit";

export const qrBuilder = async (
   id: string,
   email: string,
   eventName: string,
   area: string,
   seat: string
) => {
   const qrBuffer = await QRCode.toBuffer(id, { width: 300 });

   const doc = new PDFDocument({
      size: "A4",
      margin: 50,
   });

   doc.fontSize(24).text(`Ticket ${eventName}`, {
      align: "center",
   });

   doc.moveDown();

   doc.fontSize(18)
      .fillColor("#4B0082")
      .font("Helvetica-Bold")
      .text(`Área: ${area} - Asiento ${seat}`, { align: "center" });
   doc.moveDown();
   doc.fontSize(16)
      .fillColor("#000000")
      .font("Helvetica")
      .text(`ID del ticket: ${id}`, { align: "center" });
   doc.moveDown();
   doc.text(`Email del asistente: ${email}`, {
      align: "center",
   });

   doc.moveDown(2);

   const qrX = (doc.page.width - 300) / 2; // Centrar QR
   doc.image(qrBuffer, qrX, doc.y, { width: 300, height: 300 });

   doc.moveDown(20);
   doc.fontSize(14).text("Por favor presenta este QR al ingresar al evento.", {
      align: "center",
   });

   doc.end();

   return { doc };
};
