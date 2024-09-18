"use server";

import nodemailer, { TransportOptions } from "nodemailer";

const senderEmail = "admin@amano.games";
const gamePage = `https://amanogames.itch.io/devils-on-the-moon-pinball-playtest`;
const subject = `Devils on the moon pinball playtest`;

const transporterConfig = {
  host: process.env.SMTP_HOST!,
  port: process.env.SMTP_PORT!,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PSWD!,
  },
} as TransportOptions;

const transporter = nodemailer.createTransport(transporterConfig);

export async function sendEmail(name: string, email: string, url: string) {
  const text = `Hi ${name}! Thanks for signing up to test our game. In this email you’ll find your itch.io key.
Please read the info on the game page ${gamePage} before playing.
We’re thankful for your feedback!
-Jp & Mario

Key: ${url}
`;
  const html = `<p>Hi ${name}! Thanks for signing up to test our game. In this email you’ll find your itch.io key.
Please read the info on the <a href="${gamePage}">game page</a> before playing.</p>
<p>We’re thankful for your feedback!</p>
<p>-Jp & Mario</p><br/>
<p>Key: <a href="${url}">${url}</a></p>
`;

  const mailOptions = {
    from: senderEmail,
    to: email,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}
