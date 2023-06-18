const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pirzegedra@gmail.com',
    pass: 'xsxvebwffmxnfdfl',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
