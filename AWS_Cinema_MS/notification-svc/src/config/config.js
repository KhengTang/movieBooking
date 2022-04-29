const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require("./ssl"),
};

// as a better practice we can pass this values via env variables
const smtpSettings = {
  host: "smtp.ethereal.email",
  port: 2525,
  ssl: false,
  tls: true,
  auth: {
    user: "alysa.stiedemann96@ethereal.email",
    pass: "SdEJ9jXjD3CphBjvZv",
  },
};

module.exports = Object.assign({}, { serverSettings, smtpSettings });
