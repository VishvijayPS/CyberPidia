const nodemailer = require('nodemailer');

async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Cyberpidia OTP',
    text: `Your OTP code: ${otp}. It will expire in 10 minutes.`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTP;
