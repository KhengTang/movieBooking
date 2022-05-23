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
    pass: process.env.EMAIL_PASSWORD || "1234512345",
  },
};

const twilioSettings = {
  accountSid: process.env.SMS_USERNAME || "AC44009dbccf471adb30a29d87506e8b63",
  authToken: process.env.SMS_PASSWORD || "1234512345",
};

module.exports = Object.assign(
  {},
  { serverSettings, twilioSettings, smtpSettings }
);
