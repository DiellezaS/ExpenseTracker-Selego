import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBudgetAlert = async (total) => {
  const mailOptions = {
    from: process.env.NOTIFY_FROM,
    to: process.env.NOTIFY_TO,
    subject: "Expense Tracker: Budget Limit Exceeded!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #d9534f;">Budget Alert!</h2>
        <p>Your total expenses have exceeded the budget limit of $${process.env.BUDGET_LIMIT}.</p>
        <p><strong>Total spent:</strong> $${total.toFixed(2)}</p>
        <p>Please review your expenses to stay within budget.</p>
        <hr />
        <small>Sent by Expense Tracker App</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("HTML Email sent successfully:", info.response);
  } catch (err) {
    console.error("Error sending HTML email:", err);
  }
};
