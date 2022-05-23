const { createContainer, asValue } = require("awilix");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

function initDI(
  { twilioSettings, serverSettings, models, smtpSettings },
  mediator
) {
  mediator.once("init", () => {
    const container = createContainer();
    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      smtpSettings: asValue(smtpSettings),
      twilioSettings: asValue(twilioSettings),
      twilio: asValue(
        twilio("AC44009dbccf471adb30a29d87506e8b63", "1234512345")
      ),
      nodemailer: asValue(nodemailer),
    });

    mediator.emit("di.ready", container);
  });
}

module.exports.initDI = initDI;
