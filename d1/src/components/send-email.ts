// ./src/actions/send-email.ts
"use server";

import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Server Action to send an email
export const SendEmail = async (formdata: FormData) => {
    const message = formdata.get("message");
    const name = formdata.get("name");
    const SenderEmail = formdata.get("SenderEmail");
    if (!message) {
        return {
            error: "Invalid message",
        };
    }
    await resend.emails.send({
        from: "NOTIFICATION <contact@arfazhxss.ca>",
        to: `arfazhussain@uvic.ca`,
        subject: `[${name}] sent you a message!`,
        replyTo: `${SenderEmail}`,
        text: `${message}`,
    });
    return {
        success: true,
        message: "Email sent successfully.",
    };
};
