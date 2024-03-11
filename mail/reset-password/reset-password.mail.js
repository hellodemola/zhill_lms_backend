import Mailjet from 'node-mailjet';
import { reset_message } from './reset-password.message.js';

export const SEND_RESET_PASSWORD_MAIL = async (email, name, token, emailType = 'EMAIL_VERIFICATION', userType = 'students') => {

  try {
  console.log({ email })


  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  )

  const mail = mailjet
    .post('send', { version: 'v3.1' })
    .request(reset_message(email, name, token, emailType, userType))

  mail
    .then((res) => {
      console.log(res.body)
      return true
    })
    .catch((err) => {
      console.log({ err })
      return false;
    })

} catch (error) {
  console.log(error);
  throw new Error(error)
}

}
