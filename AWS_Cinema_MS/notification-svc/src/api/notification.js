"use strict";
const status = require("http-status");

module.exports = ({ repo }, app) => {
  app.post("/notification/sendEmail", (req, res, next) => {
    const { validate } = req.container.cradle;
    console.log("notification.js\n");
    console.log("req email obj - \n" + req.body.payload);

    validate(req.body.payload, "notification")
      .then((payload) => {
        return repo.sendEmail(payload);
      })
      .then((ok) => {
        res.status(status.OK).json({ msg: "ok" });
      })
      .catch(next);
  });

  app.post("/notification/sendSMS", (req, res, next) => {
    const { validate } = req.container.cradle;
    validate(req.body.payload, "notification")
      .then((payload) => {
        return repo.sendSMS(payload);
      })
      .then((ok) => {
        res.status(status.OK).json({ msg: "ok" });
      })
      .catch(next);
  });
};
