import { transporter } from "../config/mailer.js";
export const sendEmail = async ({to, subject, text, html=null}) => {
  try{
    const info = await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text, html });
    console.log("Email sent:", info.messageId);
    return info;
  } catch(err){
    console.error("Email error:", err);
    throw err;
  }
}
