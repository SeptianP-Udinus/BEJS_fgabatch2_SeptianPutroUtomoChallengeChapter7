const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = {
  sendResetPasswordMail: (to, resetLink) => {
    return transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset your password",
      text: `Click here to reset your password: ${resetLink}`
    });
  },
  sendWelcomeMail: (to) => {
    return transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Welcome!",
      text: "Thank you for registering!"
    });
  }
};
