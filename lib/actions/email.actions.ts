"use server";

import { Resend } from "resend";

import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  from,
  to,
  subject,
  name,
  message,
}: {
  from: string;
  to: string;
  subject: string;
  name: string;
  message: string;
}) => {
  try {
    const email = await resend.emails.send({
      from,
      to,
      subject,
      react: EmailTemplate({ emailAddress: to, name, subject, message }),
    });
    return { success: true, email };
  } catch (error) {
    return { success: false, error };
  }
};
