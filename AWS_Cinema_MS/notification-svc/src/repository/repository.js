("use strict");
const repository = (container) => {
  const sendEmail = (payload) => {
    return new Promise((resolve, reject) => {
      const { smtpSettings, nodemailer } = container.cradle;
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f6dc085484d5a5",
          pass: "227a672b1d9407",
        },
      });

      const mailOptions = {
        from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
        to: `${payload.user.email}`,
        subject: `Tickets for movie ${payload.movie.title}`,
        html: `
            <h1>Tickets for ${payload.movie.title}</h1>

            <h2>Cinema: <span>${payload.cinema.name}</span> </h2>
            <h2>Room: <span>${payload.cinema.room}</span> </h2>
            <h2>Seats: <span>${payload.cinema.seats}</span> </h2>

            <h3>Movie Description: Some Description About Movie</h3>

            <h4>Total: <span>${payload.totalAmount}</h4>
            <h4>OrderID: <span>${payload.orderId}</h4>
            <h4>Receipt: <span><a href="${payload.orderReceipt}">Receipt from Payment Service</a></h4>

            <h4>Enjoy your movie 🍿🎥 &amp; have a nice day!</h4>

            <h3>&copy;Block Cinemas Microservice 2022</h3> 
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
      const { twilio } = container.cradle;
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
              resolve(true);
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
