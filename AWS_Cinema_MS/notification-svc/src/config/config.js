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

const twilioSettings = {
  accountSid: "AC44009dbccf471adb30a29d87506e8b63",
  authToken: "2dfc18c3a4e6fc7d4af7a6a4c4ce70af",
};

module.exports = Object.assign(
  {},
  { serverSettings, twilioSettings, smtpSettings }
);
