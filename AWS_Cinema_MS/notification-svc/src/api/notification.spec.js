/* eslint-env mocha */
const { createContainer, asValue } = require("awilix");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const should = require("should");
const request = require("supertest");
const server = require("../server/server");
const models = require("../models");
const { smtpSettings } = require("../config/config");

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
    nodemailer: asValue(nodemailer),
    smtpTransport: asValue(smtpTransport),
  });

  let _testRepo = {
    sendEmail({ container }, payload) {
      return new Promise((resolve, reject) => {
        const { smtpSettings, smtpTransport, nodemailer } = container.cradle;
        console.info(smtpSettings);
        const transporter = nodemailer.createTransport({
          host: smtpSettings.host,
          port: smtpSettings.port,
          ssl: smtpSettings.ssl,
          tls: smtpSettings.tls,
          auth: {
            user: smtpSettings.user,
            pass: smtpSettings.pass,
          },
        });

        // const mailOptions = {
        //   from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
        //   to: `${payload.user.email}`,
        //   subject: `Tickets for movie ${payload.movie.title}`,
        //   html: `
        //       <h1>Tickets for ${payload.movie.title}</h1>

        //       <h3>Cinema: <span>${payload.cinema.name}</span> </h3>
        //       <h4>Room: <span>${payload.cinema.room}</span> </h4>
        //       <h4>Seat(s): <span>${payload.cinema.seats}</span> </h4>

        //       <h4>description: <span>${payload.description}</span> </h4>

        //       <h4>Total: <span>${payload.totalAmount}</span> </h4>
        //       <h4>number of order: <span>${payload.orderId}</span> </h4>

        //       <h3>Cinemas Microservice 2017, Enjoy your movie 🍿🎥!</h3>
        //     `,
        // };

        const mailOptions = {
          from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
          to: `${payload.user.email}`,
          subject: `Tickets for movie `,
          html: `
              <h1>Tickets for </h1>

              <h3>Cinema: <span></span> </h3>
              <h4>Room: <span></span> </h4>
              <h4>Seat(s): <span></span> </h4>

              <h4>description: <span>$</span> </h4>

              <h4>Total: <span></span> </h4>
              <h4>number of order: <span></span> </h4>

              <h3>Cinemas Microservice 2017, Enjoy your movie 🍿🎥!</h3>
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
    },
  };

  const testRepo = {};

  testRepo.sendEmail = _testRepo.sendEmail.bind(null, { container });

  container.registerValue({ repo: testRepo });

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
      city: "Boston",
      userType: "loyal",
      totalAmount: 71,
      cinema: {
        name: "AMC Natick Plaza",
        room: "1",
        seats: "53, 54",
      },
      movie: {
        title: "Assassins Creed",
        format: "IMAX",
        schedule: new Date(),
      },
      orderId: "1aa90cx",
      description: "some description",
      user: {
        name: "The Rock",
        email: "therock@wwf.com",
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
});
