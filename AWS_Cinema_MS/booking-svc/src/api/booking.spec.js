/* eslint-env mocha */
const { createContainer, asValue } = require("awilix");
const should = require("should");
const request = require("supertest");
const server = require("../server/server");
const models = require("../models");
const services = require("../svcs");

describe("Booking API", () => {
  let app = null;

  const serverSettings = {
    port: 3000,
  };

  let testRepo = {
    makeBooking(user, booking) {
      return Promise.resolve("booking made successfully");
    },
    generateTicket(paid, booking) {
      const testTicket = {
        cinema: booking.cinema,
        schedule: booking.schedule.toString(),
        movie: booking.movie,
        seats: booking.seats,
        cinemaRoom: booking.cinemaRoom,
        orderId: 123,
      };
      return Promise.resolve(testTicket);
    },
    getOrderById(orderId) {
      return Promise.resolve("orderId: " + orderId);
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      validate: asValue(models.validate),
      booking: asValue(models.booking),
      user: asValue(models.booking),
      ticket: asValue(models.booking),
      serverSettings: asValue(serverSettings),
      paymentService: asValue(services.paymentService),
      notificationService: asValue(services.notificationService),
      repo: asValue(testRepo),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it("can make a booking and return the ticket(s)", (done) => {
    const now = new Date();
    //now.setDate(now.getDate() + 1);

    const user = {
      name: "Cristian",
      lastName: "Ramirez",
      email: "cristiano@nupp.com",
      creditCard: {
        number: "1111222233334444",
        cvc: "123",
        exp_month: "07",
        exp_year: "2017",
      },
      membership: "7777888899990000",
    };

    const booking = {
      city: "Morelia",
      cinema: "Plaza Morelia",
      movie: "Assassins Creed",
      schedule: now.toISOString().replace(/T/, " ").replace(/\..+/, ""),
      cinemaRoom: 7,
      seats: ["45"],
      totalAmount: 71,
    };

    console.info(
      "booking.spec.js - pre call : \nBooing Info - " +
        JSON.stringify(booking) +
        " \nUser Info - " +
        JSON.stringify(user) +
        " \n"
    );
    request(app)
      .post("/booking")
      .send({ user, booking })
      .expect((res) => {
        console.info(
          "booking.spec.js - res result : " + JSON.stringify(res.body)
        );
        res.body.should.containEql({
          cinema: booking.cinema,
          schedule: now.toISOString().replace(/T/, " ").replace(/\..+/, ""),
          movie: booking.movie,
          seats: booking.seats,
          cinemaRoom: booking.cinemaRoom,
          orderId: 123,
        });
      })
      .expect(200, done);
  });
});
