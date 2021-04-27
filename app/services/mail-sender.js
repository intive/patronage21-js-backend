const nodemailer = require('nodemailer')
const { generateEmailTemplate } = require('./email-template')

const send = (email, activationCode) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Kod weryfikacyjny Patron-a-tive.',
    html: generateEmailTemplate(activationCode)
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
      console.log('Message sent')
    }
  })
}

exports.send = send
