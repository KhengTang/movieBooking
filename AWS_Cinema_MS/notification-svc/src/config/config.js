const serverSettings = {
  port: process.env.PORT || 3005,
  //  ssl: require('./ssl')
};

// as a better practice we can pass this values via env variables
const smtpSettings = {
  // service: "Gmail",
  // user: process.env.EMAIL,
  // pass: process.env.EMAIL_PASS,
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  authMethod: "plain",
  auth: {
    user: "e9eb8ea13a0cf1", // generated ethereal user
    pass: "f7ebd0a7c4968b", // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
    ignoreTLS: true,
  },
};

module.exports = Object.assign({}, { serverSettings, smtpSettings });
