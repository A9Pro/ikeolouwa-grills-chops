import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { to, subject, text, html } = body;

    if (!to || !subject || !text) {
      return NextResponse.json(
        { message: 'Missing required fields: to, subject, text' },
        { status: 400 }
      );
    }

    // always CC admin email
    const recipients = [to, process.env.ADMIN_EMAIL].filter(Boolean);

    const { data, error } = await resend.emails.send({
      from: `IkeOluwa Grills <${process.env.ADMIN_EMAIL}>`,
      to: recipients,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send email', error: error.message },
        { status: 500 }
      );
    }

    console.log('Email sent:', data);
    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
