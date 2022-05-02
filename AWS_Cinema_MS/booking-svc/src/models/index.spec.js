/* eslint-env mocha */
const test = require("assert");
const { validate } = require("./");

console.log(Object.getPrototypeOf(validate));

describe("Schemas Validation", () => {
  it("can validate a booking object", (done) => {
    const now = new Date();
    //now.setDate(now.getDate() + 1);

    const testBooking = {
      city: "Morelia",
      cinema: "Plaza Morelia",
      movie: "Assassins Creed",
      schedule: now.toISOString().replace(/T/, " ").replace(/\..+/, ""),
      cinemaRoom: 7,
      seats: ["45"],
      totalAmount: 71,
    };

    validate(testBooking, "booking")
      .then((value) => {
        console.log("booking obj validated against schema");
        console.log(value);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("can validate a user object", (done) => {
    // const testUser = {
    //   name: "The",
    //   lastName: "Rock",
    //   email: "therock@wwf.com",
    //   creditCard: {
    //     number: "1111222233334444",
    //     cvc: "123",
    //     exp_month: "07",
    //     exp_year: "2017",
    //   },
    //   membership: "7777888899990000",
    // };
    const testUser = {
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

    validate(testUser, "user")
      .then((value) => {
        console.log("user obj validated against schema");
        console.log(value);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it("can validate a ticket object", (done) => {
    const now = new Date();
    // const testTicket = {
    //   cinema: "AMC Natick Plaza",
    //   schedule: now.toISOString().replace(/T/, " ").replace(/\..+/, ""),
    //   movie: "Hans Solo",
    //   seats: ["35"],
    //   cinemaRoom: 1,
    //   orderId: "34jh1231ll",
    // };

    const testTicket = {
      cinema: "Plaza Morelia",
      schedule: now.toISOString().replace(/T/, " ").replace(/\..+/, ""),
      movie: "Assassins Creed",
      seats: ["35"],
      cinemaRoom: 1,
      orderId: "34jh1231ll",
    };

    validate(testTicket, "ticket")
      .then((value) => {
        console.log("ticket obj validated against schema");
        console.log(value);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
