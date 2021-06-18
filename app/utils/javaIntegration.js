const dotenv = require('dotenv')
const User = require('../models/user')
const axios = require('axios')

dotenv.config()

const sendUser = async (email) => {
  try {
    const user = await User.findOne({ email: email },
      'firstName lastName login email phone githubLink gender technologies')
    if (!user) {
      console.log(`User nie istnieje. Email: ${email}`)
    } else if (user) {
      const sUser = user.toObject()
      sUser.phoneNumber = sUser.phone.toString()
      delete sUser.phone
      delete sUser._id
      sUser.gitHubUrl = user.githubLink
      delete sUser.githubLink
      sUser.groups = user.technologies
      delete sUser.technologies
      sUser.groups.forEach((element, i) => {
        if (element === 'JS') sUser.groups[i] = 'JavaScript'
        if (element === 'Mobile') sUser.groups[i] = 'Mobile (Android)'
      })

      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      axios
        .post(`${process.env.JAVA_ADDR}/api/users`, JSON.stringify(sUser), options)
        .then(response => {
          console.log(`statusCode: ${response.statusCode}`)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  } catch (err) {
    console.log(`Integracja nieudana. ${err}`)
  }
}

exports.sendUser = sendUser
