import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const order = await request.json();
    console.log("Received order data:", JSON.stringify(order, null, 2));

    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
      console.error("Missing environment variables:", {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      });
      return NextResponse.json(
        { error: "Missing email configuration" },
        { status: 500 }
      );
    }

    // Verify transporter connection
    await transporter.verify();
    console.log("Transporter is ready");

    // Format the email message
    const message = `
      New Order: ${order.id}
      Name: ${order.name}
      Phone: ${order.phone}
      Email: ${order.email || "N/A"}
      Delivery Address: ${order.deliveryAddress}
      Date: ${new Date(order.date).toLocaleDateString("en-US")}
      Time: ${order.time}
      Meals: ${order.mealQuantity}
      Instructions: ${order.specialInstructions || "None"}
    `;

    console.log("Attempting to send email to:", process.env.ADMIN_EMAIL);
    console.log("Message:", message);

    // Send email to admin
    await transporter.sendMail({
      from: `"Meal Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Meal Order: ${order.id}`,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    console.log("Email sent successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      code: (error as any).code,
      response: (error as any).response,
    });
    return NextResponse.json(
      { error: "Failed to send email notification", details: error.message },
      { status: 500 }
    );
  }
}