import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createContactMessage } from '@/lib/contactMessages';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, message, sourcePage } = body;

    if (!name || !email || !company || !service || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const [firstName, ...rest] = String(name).trim().split(' ');
    const lastName = rest.join(' ');

    await createContactMessage({
      sourcePage: typeof sourcePage === 'string' ? sourcePage : '/contact-us',
      firstName: firstName || 'Unknown',
      lastName: lastName || '',
      email,
      phone: typeof phone === 'string' ? phone : '',
      serviceInterest: service,
      messageBody: `${message}\n\nCompany: ${company}`,
    });

    const emailRegex = /^[^@]+@(?!gmail|yahoo|hotmail|outlook|live|icloud)[^@]+\.[^@]+$/;
    const isBusinessEmail = emailRegex.test(email.toLowerCase());

    console.log(`New contact from ${name} (${email}). Business email: ${isBusinessEmail}`);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'info@gemcybersecurityassist.com',
        subject: `New Contact Form: ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service Interest:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for contacting GEM Cybersecurity',
        html: `
          <h2>Thank you for your inquiry</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will respond within 24 hours during business hours.</p>
          <p>For immediate assistance, call us at (860) 305-4376.</p>
          <br>
          <p>Best regards,<br>GEM Cybersecurity Team</p>
        `,
      });
    } else {
      console.warn('SMTP credentials missing. Email not sent.');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 },
    );
  }
}
