/* eslint-env mocha */
const supertest = require("supertest");

describe("Booking Service", () => {
  const api = supertest("http://localhost:3002");
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
    movie: {
      title: "Hans Solo",
      format: "IMAX",
    },
    schedule: now.toString(),
    cinemaRoom: 7,
    seats: ["45"],
    totalAmount: 71,
  };
  it("can make a booking", (done) => {
    api
      .post("/booking")
      .send({ user, booking })
      .expect((res) => {
        console.log(res.body);
      })
      .expect(200, done);
  });
});
