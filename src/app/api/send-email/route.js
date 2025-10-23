// /api/sendEmail.js or /app/api/send-email/route.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ✅ Get the values from the frontend
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields: to, subject, text" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your gmail
        pass: process.env.SMTP_PASS, // your app password
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}
