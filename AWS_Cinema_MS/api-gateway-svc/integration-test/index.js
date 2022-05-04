/* eslint-env mocha */
const supertest = require("supertest");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = "1";

describe("cinema-catalog-service", () => {
  const api = supertest("https://localhost:8080");

  it("returns a 200 for a list of movies through api-gateway", (done) => {
    api.get("/movies").expect(200, done);
  });

  it("returns schedules for a movie through api-gateway", (done) => {
    api.get("/cinemas/588ababf2d029a6d15d0b5bf/1").expect(200, done);
  });

  it("can make a booking through api-gateway", function (done) {
    this.timeout(5000);
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const user = {
      name: "Brian ",
      lastName: "Khiatani",
      email: "briankhi3@gmail.com",
      creditCard: {
        number: "4242424242424242",
        cvc: "123",
        exp_month: "12",
        exp_year: "2017",
      },
      membership: "4534542086103735",
    };

    const booking = {
      city: "Jurong East",
      cinema: "Block Cinema Jurong East",
      movie: "Hans Solo",
      schedule: now.toString(),
      cinemaRoom: 7,
      seats: ["45"],
      totalAmount: 71,
    };

    api.post("/booking").send({ user, booking }).expect(200, done);
  });

  it("can make a paymentOrder through api-gateway", function (done) {
    this.timeout(3000);
    const testPayment = {
      userName: "Brian Khiatani",
      currency: "sgd",
      number: "4242424242424242",
      cvc: "123",
      exp_month: "12",
      exp_year: "2017",
      amount: 71,
      description: `
        Ticket(s) for movie "Hans Solo",
        with seat(s) 47, 48
        at time 8 / feb / 17`,
    };
    api
      .post("/payment/makePurchase")
      .send({ paymentOrder: testPayment })
      .expect(200, done);
  });

  it("can send a notification through api-gateway", function (done) {
    this.timeout(3000);
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
        name: "Cristian Ramirez",
        email: "briankhi3@gmail.com",
      },
    };
    api.post("/notification/sendEmail").send({ payload }).expect(200, done);
  });
});
