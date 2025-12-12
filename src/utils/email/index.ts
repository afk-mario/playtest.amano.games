"use server";

import nodemailer, { TransportOptions } from "nodemailer";

const senderEmail = "admin@amano.games";
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
  const text = `Hi ${name}! We’re reaching out because you gave us great feedback during our last “Devils on the Moon” Playtest. We really appreciate it, Thank You!

If you’re still interested in trying out our most recent build and giving us some feedback on it again, here is a link to a new itch.io key just for you.

* If it runs kinda slow on device it is because you probably have an older playdate which we have yet to optimize performance for. It’s still playable but in case you want to play a smoother version we’ve Included the web-player version of the game in your link.

Thanks Again!

Best!
-Jp & Mario

Key: ${url}`;
  const html = `<p>Hi ${name}! We’re reaching out because you gave us great feedback during our last “Devils on the Moon” Playtest. We really appreciate it, Thank You!</p>

<p>If you’re still interested in trying out our most recent build and giving us some feedback on it again, here is a link to a new itch.io key just for you.</p>

<p><i>If it runs kinda slow on device it is because you probably have an older playdate which we have yet to optimize performance for. It’s still playable but in case you want to play a smoother version we’ve Included the web-player version of the game in your link.</i></p>

<p>Thanks Again!</p>
<p>Best!<br/>-Jp & Mario</p><br/>
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
