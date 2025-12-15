const nodemailer = require('nodemailer');

const createTransporter = () => {
  // If SMTP credentials are provided, use real transporter
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Fallback to console logging
  return {
    sendMail: async (mailOptions) => {
      console.log('\n📧 EMAIL (Console Mode - SMTP not configured):');
      console.log('-------------------------------------------');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', mailOptions.text || mailOptions.html);
      console.log('-------------------------------------------\n');
      return { messageId: 'console-' + Date.now() };
    },
  };
};

const transporter = createTransporter();

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@bracu-consultation.com',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw error;
  }
};

module.exports = { sendEmail };
