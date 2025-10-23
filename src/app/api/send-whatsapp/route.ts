// src/app/api/send-whatsapp/route.ts

import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const body = await request.json();
    const { to, message } = body;

    if (!to || !message) {
      return NextResponse.json(
        { message: 'Missing required fields: to, message' },
        { status: 400 }
      );
    }

    // For WhatsApp, prefix the 'to' with 'whatsapp:' if not already
    const whatsappTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    const result = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp sandbox number, e.g., +14155238886
      to: whatsappTo,
    });

    return NextResponse.json({ message: 'WhatsApp message sent successfully', result });
  } catch (error) {
    console.error('Twilio WhatsApp error:', error);
    return NextResponse.json(
      { message: 'Failed to send WhatsApp message', error: (error as Error).message },
      { status: 500 }
    );
  }
}