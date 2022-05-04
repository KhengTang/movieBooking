/* eslint-env mocha */
const test = require("assert");
const { validate } = require("./");

console.log(Object.getPrototypeOf(validate));

describe("Schemas Validation", () => {
  it("can validate a notification object", (done) => {
    const notificationSchema = {
      city: "Boston",
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

    validate(notificationSchema, "notification")
      .then((value) => {
        test.ok(value);
        console.log(value);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
