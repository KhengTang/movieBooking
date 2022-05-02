const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require("./ssl"),
};

// as a better practice we can pass this values via env variables
const smtpSettings = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME || "bbce5d94fedce3",
    pass: process.env.EMAIL_PASSWORD || "61466dd49cd218",
  },
};

module.exports = Object.assign({}, { serverSettings, smtpSettings });
