const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"SkillLink" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `<h2>Welcome to SkillLink!</h2><p>${text}</p><p>Best regards,<br>SkillLink Team</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error, error.stack);
    throw new Error('Failed to send email: ' + error.message);
  }
};

module.exports = sendEmail;