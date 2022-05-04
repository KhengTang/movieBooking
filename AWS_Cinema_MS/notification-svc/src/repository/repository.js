"use strict";
const repository = (container) => {
  const sendEmail = (payload) => {
    return new Promise((resolve, reject) => {
      const { smtpSettings, smtpTransport, nodemailer } = container.cradle;
      const transporter = nodemailer.createTransport({
        host: smtpSettings.host,
        port: smtpSettings.port,
        auth: {
          user: smtpSettings.user,
          pass: smtpSettings.pass,
        },
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
    return new Promise((resolve, reject) => {
      const { twilioSettings, twilio } = container.cradle;

      let transport = twilio.messages
        .create(
          {
            body: `Tickets for ${payload.movie.title}, 
            Cinema@${payload.cinema.name}, 
            Room:${payload.cinema.name} & 
            Seats @${payload.cinema.seats}
            Thank You`,
            from: "+13253356157",
            to: "+6597913593",
          },
          (err, result) => {
            if (err && err.type === "TwilioSMSError") {
              reject(
                new Error("An error occurred processing sms, err: " + err)
              );
            } else {
              const temp_result = Object.assign({}, { result });
              resolve(temp_result);
            }
          }
        )
        .then((message) => console.log(message.sid));
    });
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
