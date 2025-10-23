import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Generate simple order ID
function generateOrderId() {
  return "AZ-" + Math.floor(1000 + Math.random() * 9000);
}

export async function POST(req: Request) {
  try {
    const {
      name,
      phone,
      email,
      address,
      date,
      time,
      meals,
      instructions,
    } = await req.json();

    const orderId = generateOrderId();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Meal Booking" <${process.env.EMAIL_USER}>`,
      to: "herpick3@gmail.com", // you (admin)
      subject: `New Meal Order: ${orderId}`,
      text: `
New Order: ${orderId}
Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Delivery Address: ${address}
Date: ${date}
Time: ${time}
Meals: ${meals}
Instructions: ${instructions || "None"}
      `,
      html: `
        <h2>New Order: ${orderId}</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email || "N/A"}</p>
        <p><b>Delivery Address:</b> ${address}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Meals:</b> ${meals}</p>
        <p><b>Instructions:</b> ${instructions || "None"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Order email sent" });
  } catch (error: any) {
    console.error("Email error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
