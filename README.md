# 🎟️ Ticketing App API

A backend API for managing events and ticketing, featuring PDF ticket generation, PayPal integration, and email notifications.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **PDF Generation:** PDFKit
- **Emailing:** Nodemailer
- **Payment Integration:** PayPal

---

## 📌 Features

- ✅ Create, retrieve, and delete events
- 🎫 Issue and validate tickets
- 🧾 Generate PDF tickets with QR or details
- 📧 Send tickets via email
- 💳 Integrate PayPal for ticket purchase

---

## 🧭 API Endpoints

### 🔘 Events
- `POST /api/events/` — Create a new event
- `GET /api/events/` — Get all events
- `DELETE /api/events/:id` — Delete an event

### 🎟️ Tickets
- `POST /api/tickets/generate-ticket-pdf` — Generate and send a ticket as a PDF
- `GET /api/tickets/validate/:id` — Validate a ticket by ID
- `GET /api/tickets/get-all-tickets` — Get all issued tickets
- `GET /api/tickets/id/:id` — Get a single ticket by ID

### 💳 Payments
- `POST /api/payments/paypal/checkout/:ticketId` — Initiate a PayPal checkout for a specific ticket

---

## 📦 Installation

### Prerequisites

- Node.js ≥ 14.x
- MongoDB (local or cloud instance)

### Setup

```bash
git clone https://github.com/faustocalvinio/backend-ticketing-app.git
cd backend-ticketing-app
npm install
```