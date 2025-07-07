"use server";
import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false, // Use false for port 587
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) {
      console.error("SMTP server verification failed");
      return { success: false, error: "SMTP verification failed" };
    }
  } catch (error) {
    console.error("Something Went Wrong with SMTP verification:", error);
    return { success: false, error: "SMTP verification failed" };
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME, // Use your verified email as sender
      to: sendTo || SITE_MAIL_RECEIVER,
      subject: subject,
      text: text,
      html: html ? html : "",
    });

    console.log("Message Sent", info.messageId);
    console.log("Mail sent to", sendTo || SITE_MAIL_RECEIVER);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

// New function to handle contact form submissions
export async function sendContactEmails({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    // Email to you (site owner)
    const adminMailText = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}

Please respond to this inquiry as soon as possible.
    `;

    const adminMailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2C3746; border-bottom: 2px solid #2C3746; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong></p>
    <p style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${message}</p>
  </div>
  <p style="color: #666; font-size: 14px;">
    Please respond to this inquiry as soon as possible.
  </p>
</div>
    `;

    // Email to user (acknowledgment)
    const userMailText = `
Hi ${name},

Thank you for contacting us! We've received your message and will get back to you within 24 hours.

Your message:
${message}

We appreciate your interest and look forward to connecting with you soon.

Best regards,
The Infinite Change Team
    `;

    const userMailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2C3746; border-bottom: 2px solid #2C3746; padding-bottom: 10px;">
    Thank You for Contacting Us!
  </h2>
  <p>Hi ${name},</p>
  <p>Thank you for contacting us! We've received your message and will get back to you within 24 hours.</p>
  
  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Your message:</strong></p>
    <p style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${message}</p>
  </div>
  
  <p>We appreciate your interest and look forward to connecting with you soon.</p>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
    <p style="color: #666; font-size: 14px;">
      Best regards,<br>
      The Infinite Change Team
    </p>
  </div>
</div>
    `;

    // Send email to admin
    const adminResult = await sendMail({
      email: SMTP_SERVER_USERNAME!,
      sendTo: SITE_MAIL_RECEIVER,
      subject: "New Contact Form Submission",
      text: adminMailText,
      html: adminMailHtml,
    });

    // Send acknowledgment email to user
    const userResult = await sendMail({
      email: SMTP_SERVER_USERNAME!,
      sendTo: email,
      subject: "Thank you for contacting us - Infinite Change",
      text: userMailText,
      html: userMailHtml,
    });

    // Return success if both emails sent successfully
    if (adminResult.success && userResult.success) {
      return {
        success: true,
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId,
      };
    } else {
      return {
        success: false,
        error: "Failed to send one or both emails",
        adminResult,
        userResult,
      };
    }
  } catch (error) {
    console.error("Error in sendContactEmails:", error);
    return { success: false, error: "Failed to process contact form" };
  }
}
