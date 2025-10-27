# Expense Tracker - Selego Technical Assessment

A full-stack Expense Tracker application built with **React**, **Node.js/Express**, and **MongoDB**.  
Track expenses by category, visualize trends with charts, and manage your budget effectively.

---

## Features

- Create and manage **categories** 
- Add, view, and delete **expenses**
- **Pie chart** for expenses by category
- **Line chart** for expense trends over time
- Budget monitoring with alert when the limit is exceeded
- Email notifications when total expenses exceed a defined budget limit
- Responsive and user-friendly UI.

---

## Tech Stack

- **Frontend:** React, Recharts  
- **Backend:** Node.js, Express, Mongoose  
- **Database:** MongoDB Atlas  
- **Styling:** Inline CSS  
- **Email:** Brevo (SMTP)

---

## Project Structure

Expense-tracker/
├── backend/
│ ├── models/
│ │ ├── Category.js
│ │ └── Expense.js
│ ├── routes/
│ │ ├── categoryRoutes.js
│ │ └── expenseRoutes.js
│ ├── services/
│ │ └── emailService.js
│ ├── server.js
│ ├── testEmail.js
│ └── .env.example
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── App.js
│ │ └──index.js
└── README.md
 
---

## Setup Instructions

### 1. Clone the repository

```bash
git clone expense-tracker
cd expense-tracker

```
### 2. Backend Setup
cd backend
npm install

Create a .env file inside the backend folder and copy the variables from .env.example
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
BUDGET_LIMIT=1000

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=<your-smtp-user>
SMTP_PASS=<your-smtp-pass>
NOTIFY_FROM="Expense Tracker <your-email>"
NOTIFY_TO=<your-email>

### 3. Connect to MongoDB
MONGO_URI=mongodb+srv://<db_user>:<encoded_password>@.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0


### 4. Budget Threshold

Set a limit for your total expenses
When the total exceeds this amount, you’ll automatically receive an email notification.
BUDGET_LIMIT=1000

### 5. Setup Email Notifications (Brevo SMTP)

Go to https://www.brevo.com/ and create an account

Generate your SMTP key in SMTP & API → SMTP → Generate New Key.

Paste the key into SMTP_PASS in .env file.

### 6. Run the backend
Start the backend server:
npm run dev

The backend runs at http://localhost:5000


### 7. Frontend Setup
cd ../frontend
npm install
npm start

The frontend opens at http://localhost:3000 and connects to the backend API


### 8. Test the App

Add some categories and expenses.

When total expenses exceed your budget limit, an email notification will be sent automatically via Brevo SMTP.


## Decisions

Used MongoDB Atlas for easy cloud access.
Implemented budget email alerts using Brevo SMTP (can also use Gmail or Outlook/Hotmail).
Chose Mongoose for data modeling and validation.
Split project into frontend (React) and backend (Express) for clarity
Focused on a simple, clean UI and RESTful API design.

## Challenges
Setting up and testing the email notification system with SMTP, especially configuring it to work properly with Gmail.

#### Time Spent

Backend : 2.5h
Frontend: 2h
Tests:15min
README: 35min

