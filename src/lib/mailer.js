// import nodemailer from "nodemailer";
// import { User } from "@/model/user-model";
// import bcryptjs from "bcryptjs";
// import crypto from "crypto";


// export const sendEmail = async (email, emailType, userId) => {
//   try {
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       // Send verification email
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000, // 1 hour
//       });
//     } else if (emailType === "RESET") {
//       // Send password reset email
//       await User.findByIdAndUpdate(userId, {
//         forgotToken: hashedToken,
//         forgotTokenExpiry: Date.now() + 3600000, // 1 hour
//       });
//     }

//     // Looking to send emails in production? Check out our Email API/SMTP product!
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "ade28475b9b074",
//         pass: "72f446d3dad4e4",
//       },
//     });

//     const mailOptions = {
//       from: "fsrakiba50@gmail.com",
//       to: email,
//       subject:
//         emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//       html: `<p>
//       Click <a href="${
//         process.env.NEXT_PUBLIC_BASE_URL
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       } 
//       or copy and paste the following link into your browser:
//         <br />
//         <a href="${
//           process.env.NEXT_PUBLIC_BASE_URL
//         }/verifyemail?token=${hashedToken}">${
//         process.env.NEXT_PUBLIC_BASE_URL
//       }/verifyemail?token=${hashedToken}</a>
//       .</p>`,
//     };
//     const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error(error.message);
//   }
// };
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use environment variables
  },
});
