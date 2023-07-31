import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

export async function POST(req, res) {
  try {
    const data = await req.json();

    const message = {
      from: process.env.SMTP_USER,
      to: process.env.MAIL_RECEIVER,
      subject: data.subject,
      text: data.message,
      html: data.message,
    };

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PW,
      },
      // tls: {
      //   rejectUnauthorized: false, // ONLY FOR LOCAL TESTING
      // },
    });

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Transporter success');
      }
    });
    // ...
    return NextResponse.json({ co: 'Mail send' }); // <-- Needed to add a response, didn't have before
  } catch (error) {
    return NextResponse.json(
      { error: `Failed because of ${error}` },
      { status: 500 }
    );
  }
}
