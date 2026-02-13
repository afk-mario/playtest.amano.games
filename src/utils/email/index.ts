"use server";

import { Resend } from "resend";
import { emailGetHTML, emailGetTxt } from "./utils";

const senderEmail = "admin@contact.amano.games";
const subject = `Devils on the moon pinball playtest`;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name: string, email: string, url: string) {
  const text = emailGetTxt(name, url);
  const html = emailGetHTML(name, url);
  return resend.emails.send({
    from: senderEmail,
    to: email,
    subject,
    html,
    text,
  });
}
