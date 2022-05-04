/* eslint-env mocha */
const { createContainer, asValue } = require("awilix");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
//const smtpTransport = require("nodemailer-smtp-transport");
const should = require("should");
const request = require("supertest");
const server = require("../server/server");
const models = require("../models");
const { twilioSettings, smtpSettings } = require("../config/config");

describe("Booking API", () => {
  let app = null;

  const serverSettings = {
    port: 3000,
  };

  const container = createContainer();

  container.register({
    validate: asValue(models.validate),
    serverSettings: asValue(serverSettings),
    smtpSettings: asValue(smtpSettings),
    twilioSettings: asValue(twilioSettings),
    nodemailer: asValue(nodemailer),
    twilio: asValue(
      twilio(twilioSettings.accountSid, twilioSettings.authToken)
    ),
    //smtpTransport: asValue(smtpTransport),
  });

  let _testRepo = {
    sendEmail({ container }, payload) {
      return new Promise((resolve, reject) => {
        //const { smtpSettings, smtpTransport, nodemailer } = container.cradle;
        const { smtpSettings, nodemailer } = container.cradle;
        console.info(smtpSettings);
        // let transport = nodemailer.createTransport({
        //   host: smtpSettings.host,
        //   port: smtpSettings.port,
        //   auth: {
        //     user: smtpSettings.user,
        //     pass: smtpSettings.pass,
        //   },
        // });
        let transport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "f6dc085484d5a5",
            pass: "227a672b1d9407",
          },
        });

        const mailOptions = {
          from: '"Do Not Reply, Block Cinemas Company 👥" <no-replay@blockcinemas.com>',
          to: `${payload.user.email}`,
          subject: `Tickets for movie ${payload.movie.title}`,
          html: ` 
              <h1>Thank You for Purchase.</h1>

              <h2>Tickets for ${payload.movie.title}</h2>

              <h3>Cinema: <span>${payload.cinema.name}</span> </h3>
              <h4>Room: <span>${payload.cinema.room}</span> </h4>
              <h4>Seat(s): <span>${payload.cinema.seats}</span> </h4>

              <h4>description: <span>${payload.description}</span> </h4>

              <h4>Total: <span>${payload.totalAmount}</span> </h4>
              <h4>number of order: <span>${payload.orderId}</span> </h4>

              <h3>Enjoy your movie 🍿🎥 &amp; have a nice day!</h3>

              <h3>&copy;Block Cinemas Microservice 2022</h3> 
            `,
        };

        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(new Error("An error occurred sending an email, err:" + err));
          }
          resolve(info);
          transport.close();
        });
      });
    },
    sendSMS({ container }, payload) {
      return new Promise((resolve, reject) => {
        const { twilioSettings, twilio } = container.cradle;

        let transport = twilio.messages
          .create(
            {
              body: `Tickets for ${payload.movie.title}, 
            Cinema@${payload.cinema.name}, 
            Room:${payload.cinema.room} & 
            Seats:${payload.cinema.seats}
            Thank You & Have a Nice Day`,
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
    },
  };

  const testRepo = {};

  testRepo.sendEmail = _testRepo.sendEmail.bind(null, { container });
  testRepo.sendSMS = _testRepo.sendSMS.bind(null, { container });

  // old codes
  //container.registerValue({ repo: testRepo });]

  container.register({ repo: asValue(testRepo) });

  beforeEach(() => {
    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it("can make a booking and return the ticket(s)", (done) => {
    const payload = {
      city: "Jurong East",
      userType: "loyal",
      totalAmount: 71,
      cinema: {
        name: "Block Cinema Jurong East",
        room: "1",
        seats: "53, 54",
      },
      movie: {
        title: "Hans Solo",
        format: "IMAX",
        schedule: new Date(),
      },
      orderId: "1aa90cx",
      description: "some description",
      user: {
        name: "Brian Khiatani",
        email: "briankhi3@gmail.com",
      },
    };

    request(app)
      .post("/notification/sendEmail")
      .send({ payload })
      .expect((res) => {
        should.ok(res.body);
      })
      .expect(200, done);
  });

  it("can send a sms", (done) => {
    const payload = {
      city: "Jurong East",
      userType: "loyal",
      totalAmount: 71,
      cinema: {
        name: "Block Cinema Jurong East",
        room: "1",
        seats: "53, 54",
      },
      movie: {
        title: "Hans Solo",
        format: "IMAX",
        schedule: new Date(),
      },
      orderId: "1aa90cx",
      description: "some description",
      user: {
        name: "Brian Khiatani",
        email: "briankhi3@gmail.com",
      },
    };

    request(app)
      .post("/notification/sendSMS")
      .send({ payload })
      .expect((res) => {
        should.ok(res.body);
      })
      .expect(200, done);
  });
});
