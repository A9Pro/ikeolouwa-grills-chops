import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request): Promise<Response> {
  try {
    const order = await request.json();
    console.log("Received order data:", JSON.stringify(order, null, 2));

    // Check environment variables
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.ADMIN_EMAIL
    ) {
      console.error("Missing environment variables:", {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS ? "****" : undefined,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      });
      return NextResponse.json(
        { error: "Missing email configuration" },
        { status: 500 }
      );
    }


  
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

    console.log("Sending email to:", process.env.ADMIN_EMAIL);

    await transporter.sendMail({
      from: `"Meal Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Meal Order: ${order.id}`,
      text: message,
      html: `<pre>${message}</pre>`,
    });

    console.log("✅ Email sent successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error sending email:", error);
    }

    return NextResponse.json(
      { error: "Failed to send vendor notification." },
      { status: 500 }
    );
  }
}
