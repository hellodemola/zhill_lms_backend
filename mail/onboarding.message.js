import messageOnboarding from "./onboaring.html.js"

export const message = (
  email,
  name = 'test',
  token = 1020,
  emailType = "EMAIL_VERIFICATION",
  userType = "students"
) => {

  const {
    FRONTEND_URL: base_url,
    EMAIL_VERIFICATION_REDIRECT,
    FORGET_PASSWORD_REDIRECT,
  } = process.env

  const swapVar = (type) => {
    if (type === 'EMAIL_VERIFICATION') return EMAIL_VERIFICATION_REDIRECT
    return FORGET_PASSWORD_REDIRECT
  }

  return {Messages: [
            {
              From: {
                Email: process.env.NEWSLETTER_USERNAME,
                Name: process.env.NEWSLETTER_NAME
              },
              To: [
                {
                  Email: email,
                  Name: name
                }
              ],
              Subject: "Welcome to LMS",
      HTMLPart: messageOnboarding({
        email,
        name,
        base_url,
        token,
        emailType,
        userType,
        swapVar,
      })
            }
          ]}}
