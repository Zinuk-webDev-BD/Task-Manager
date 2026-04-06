const nodemailer = require("nodemailer");
const { OTPMailTemp } = require("./emailTemplates");

// Create a transporter using SMTP


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "zinuk758@gmail.com",
    pass: "",
  },
});

const mailSender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: '"TaskManager Team" <team@taskmanager.com>',
      to: email,
      subject: subject,
      html: OTPMailTemp(otp),
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};

module.exports = { mailSender };