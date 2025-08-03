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
    // Email to you (site owner) - Clean and professional
    const adminMailText = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}

Please respond to this inquiry as soon as possible.
    `;

    const adminMailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F7FAFF;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header with Logo Space -->
    <div style="background: linear-gradient(135deg, #7FB756 0%, #7AADB9 100%); padding: 30px 20px; text-align: center; border-radius: 0;">
      <!-- Logo placeholder - Replace with your actual logo -->
      <div style="background-color: rgba(255,255,255,0.2); width: 120px; height: 60px; margin: 0 auto 20px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(255,255,255,0.5);">
        <span style="color: #ffffff; font-size: 12px; font-weight: 600;">YOUR LOGO</span>
      </div>
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        New Contact Inquiry
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">
        High-priority lead notification
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <div style="background: linear-gradient(145deg, #F7FAFF 0%, #ffffff 100%); padding: 30px; border-radius: 15px; border-left: 5px solid #EAC94E; box-shadow: 0 2px 15px rgba(0,0,0,0.05);">
        
        <div style="display: grid; gap: 20px;">
          <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e8f0fe;">
            <label style="color: #7FB756; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</label>
            <p style="margin: 8px 0 0; font-size: 18px; font-weight: 600; color: #2c3e50;">${name}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e8f0fe;">
            <label style="color: #7FB756; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</label>
            <p style="margin: 8px 0 0; font-size: 16px; color: #DB451E; font-weight: 500;">
              <a href="mailto:${email}" style="color: #DB451E; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e8f0fe;">
            <label style="color: #7FB756; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</label>
            <p style="margin: 8px 0 0; font-size: 16px; color: #7AADB9; font-weight: 500;">
              <a href="tel:${phone}" style="color: #7AADB9; text-decoration: none;">${phone}</a>
            </p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e8f0fe;">
            <label style="color: #7FB756; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</label>
            <div style="margin: 15px 0 0; padding: 20px; background: #F7FAFF; border-radius: 8px; border-left: 4px solid #EAC94E;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #34495e;">${message}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #DB451E 0%, #EAC94E 100%); color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(219, 69, 30, 0.3); transition: all 0.3s ease;">
          Reply Now →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #2c3e50; padding: 20px; text-align: center;">
      <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">
        🔥 High Priority • Respond within 2 hours for best conversion rates
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Email to user (acknowledgment) - Conversion-focused with strong branding
    const userMailText = `
Hi ${name},

Thank you for contacting Infinite Change! We've received your message and will get back to you within 24 hours.

Your message:
${message}

We appreciate your interest and look forward to connecting with you soon.

Best regards,
The Infinite Change Team
    `;

    const userMailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Infinite Change</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F7FAFF;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header with Branding -->
    <div style="background: linear-gradient(135deg, #7FB756 0%, #7AADB9 100%); padding: 40px 20px; text-align: center; position: relative; overflow: hidden;">
      <!-- Decorative Elements -->
      <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.5;"></div>
      <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
      
      <!-- Logo placeholder -->
      <div style="background-color: rgba(255,255,255,0.2); width: 140px; height: 70px; margin: 0 auto 25px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 2px dashed rgba(255,255,255,0.5); position: relative; z-index: 2;">
            <img src="/logo-new.png" alt="Infinite Change" style="width: 100%; height: 100%; object-fit: contain;" />
       
      </div>
      
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); position: relative; z-index: 2;">
        Welcome to Infinite Change!
      </h1>
      <p style="color: rgba(255,255,255,0.95); margin: 15px 0 0; font-size: 18px; font-weight: 300; position: relative; z-index: 2;">
        Your transformation journey starts here
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">
      <!-- Personal Greeting -->
      <div style="text-align: center; margin-bottom: 35px;">
        <h2 style="color: #2c3e50; font-size: 24px; font-weight: 600; margin: 0 0 15px;">
          Hi ${name}! 👋
        </h2>
        <p style="color: #7AADB9; font-size: 18px; margin: 0; font-weight: 500;">
          Thank you for reaching out to us
        </p>
      </div>

      <!-- Confirmation Box -->
      <div style="background: linear-gradient(145deg, #F7FAFF 0%, #ffffff 100%); padding: 30px; border-radius: 20px; border: 2px solid #7FB756; box-shadow: 0 8px 25px rgba(127, 183, 86, 0.1); margin-bottom: 30px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #7FB756, #EAC94E); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(127, 183, 86, 0.3);">
            <span style="color: #ffffff; font-size: 24px; line-height: 1;">✓</span>
          </div>
        </div>
        
        <h3 style="color: #7FB756; text-align: center; font-size: 20px; font-weight: 600; margin: 0 0 15px;">
          Message Received Successfully!
        </h3>
        
        <p style="color: #34495e; text-align: center; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          We'll get back to you within <strong style="color: #DB451E;">24 hours</strong> with a personalized response.
        </p>

        <!-- Message Preview -->
        <div style="background: #ffffff; padding: 20px; border-radius: 12px; border-left: 4px solid #EAC94E; margin-top: 20px;">
          <p style="color: #7FB756; font-weight: 600; font-size: 14px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message:</p>
          <p style="color: #34495e; font-size: 15px; line-height: 1.5; margin: 0; font-style: italic;">"${message}"</p>
        </div>
      </div>

      <!-- Value Proposition -->
      <div style="background: linear-gradient(135deg, #DB451E 0%, #EAC94E 100%); padding: 30px; border-radius: 20px; text-align: center; margin-bottom: 30px; box-shadow: 0 8px 25px rgba(219, 69, 30, 0.2);">
        <h3 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 15px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          Why Choose Infinite Change?
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 25px;">
          <div style="text-align: center;">
            <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; line-height: 1;">
              <span style="color: #ffffff; font-size: 20px;">🚀</span>
            </div>
            <p style="color: rgba(255,255,255,0.95); font-size: 14px; font-weight: 600; margin: 0;">Fast Results</p>
          </div>
          <div style="text-align: center;">
            <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; line-height: 1;">
              <span style="color: #ffffff; font-size: 20px;">💡</span>
            </div>
            <p style="color: rgba(255,255,255,0.95); font-size: 14px; font-weight: 600; margin: 0;">Expert Solutions</p>
          </div>
          <div style="text-align: center;">
            <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; line-height: 1;">
              <span style="color: #ffffff; font-size: 20px;">🤝</span>
            </div>
            <p style="color: rgba(255,255,255,0.95); font-size: 14px; font-weight: 600; margin: 0;">Dedicated Support</p>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div style="background: #F7FAFF; padding: 25px; border-radius: 15px; border: 1px solid #e8f0fe;">
        <h4 style="color: #2c3e50; font-size: 18px; font-weight: 600; margin: 0 0 15px;">
          What happens next?
        </h4>
        <div style="display: grid; gap: 15px;">
          <div style="display: flex; align-items: center;">
            <div style="background: #7FB756; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; margin-right: 15px; line-height: 24px; text-align: center;">
              1
            </div>
            <p style="color: #34495e; margin: 0; font-size: 14px;">Our team reviews your inquiry carefully</p>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="background: #7AADB9; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; margin-right: 15px; line-height: 24px; text-align: center;">
              2
            </div>
            <p style="color: #34495e; margin: 0; font-size: 14px;">We prepare a personalized response</p>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="background: #EAC94E; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; margin-right: 15px; line-height: 24px; text-align: center;">
              3
            </div>
            <p style="color: #34495e; margin: 0; font-size: 14px;">You receive our detailed proposal within 24 hours</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #2c3e50; padding: 30px 20px; text-align: center;">
      <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 10px;">
        Ready to Start Your Transformation?
      </p>
      <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px; font-size: 14px;">
        Follow us for daily inspiration and success stories
      </p>
      
      <!-- Social Media Placeholders -->
      <div style="margin: 20px 0;">
        <a href="#" style="display: inline-block; margin: 0 10px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none; color: #ffffff; line-height: 40px; font-size: 16px;">f</a>
        <a href="#" style="display: inline-block; margin: 0 10px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none; color: #ffffff; line-height: 40px; font-size: 16px;">t</a>
        <a href="#" style="display: inline-block; margin: 0 10px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none; color: #ffffff; line-height: 40px; font-size: 16px;">in</a>
      </div>
      
      <p style="color: rgba(255,255,255,0.6); margin: 20px 0 0; font-size: 12px;">
        © 2024 Infinite Change. All rights reserved.<br>
        This email was sent because you contacted us through our website.
      </p>
    </div>
  </div>
</body>
</html>

    `;

    // Send email to admin
    const adminResult = await sendMail({
      email: SMTP_SERVER_USERNAME!,
      sendTo: SITE_MAIL_RECEIVER,
      subject: "🔥 New High-Priority Contact Form Submission",
      text: adminMailText,
      html: adminMailHtml,
    });

    // Send acknowledgment email to user
    const userResult = await sendMail({
      email: SMTP_SERVER_USERNAME!,
      sendTo: email,
      subject: "Welcome to Infinite Change - Your Journey Begins Now! 🚀",
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
