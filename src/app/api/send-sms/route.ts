// src/app/api/send-sms/route.ts

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

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to,
    });

    return NextResponse.json({ message: 'SMS sent successfully', result });
  } catch (error) {
    console.error('Twilio SMS error:', error);
    return NextResponse.json(
      { message: 'Failed to send SMS', error: (error as Error).message },
      { status: 500 }
    );
  }
}