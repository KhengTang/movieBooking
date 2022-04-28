"use strict";
const repository = (container) => {
  const sendEmail = (payload) => {
    return new Promise((resolve, reject) => {
      const { smtpSettings, smtpTransport, nodemailer } = container.cradle;

      const transporter = nodemailer.createTransport({
        host: smtpSettings.host,
        port: smtpSettings.port,
        secure: smtpSettings.secure,
        authMethod: smtpSettings.authMethod,
        auth: {
          user: smtpSettings.user,
          pass: smtpSettings.pass,
        },
        tls: {
          rejectUnauthorized: smtpSettings.tls.rejectUnauthorized,
          ignoreTLS: smtpSettings.tls.ignoreTLS,
        },
        logger: true,
        transactionLog: true,
      });

      const mailOptions = {
        from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
        to: `${payload.user.email}`,
        subject: `Tickets for movie ${payload.movie.title}`,
        html: `
            <h1>Tickets for ${payload.movie.title}</h1>

            <p>Cinema: ${payload.cinema.name}</p>
            <p>Room: ${payload.cinema.room}</p>
            <p>Seats: ${payload.cinema.seats}</p>

            <p>description: ${payload.description}</p>

            <p>Total: ${payload.totalAmount}</p>
            <p>Total: ${payload.orderId}</p>

            <h3>Cinemas Microservice 2018, Enjoy your movie !</h3>
          `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(new Error("An error occurred sending an email, err:" + err));
        }
        transporter.close();
        resolve(info);
      });
    });
  };

  const sendSMS = (payload) => {
    // TODO: code for some sms service
  };

  return Object.create({
    sendSMS,
    sendEmail,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error("Dependencies not supplied!"));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
