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
      return console.log('Podczas próby wysłania e-maila wystąpił błąd', err)
    } else {
      console.log('Message sent: ', info)
    }
  })
}

exports.send = send
