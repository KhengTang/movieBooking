/* eslint-env mocha */
const test = require("assert");
const { validate } = require("./");

console.log(Object.getPrototypeOf(validate));

describe("Schemas Validation", () => {
  it("can validate a user object", (done) => {
    const testPayment = {
      metadata: {
        name: "TestUser",
      },
      currency: "sgd",
      amount: 1,
      source: "tok_visa",
      description: `
        Ticket(s) for movie "Assassins Creed",
        with seat(s) 47, 48
        at time 8 / feb / 17`,
    };

    validate(testPayment, "payment")
      .then((value) => {
        console.log("validated");
        console.log(value);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
