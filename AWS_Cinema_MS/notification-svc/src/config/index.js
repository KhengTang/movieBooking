const { twilioSettings, smtpSettings, serverSettings } = require("./config");
const { initDI } = require("./di");
const models = require("../models");

const init = initDI.bind(null, {
  serverSettings,
  twilioSettings,
  smtpSettings,
  models,
});

module.exports = Object.assign({}, { init });
