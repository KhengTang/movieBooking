/* eslint-env mocha */
const { createContainer, asValue } = require("awilix");
const { stripeSettings } = require("../config/config");
const stripe = require("stripe");
const should = require("should");
const request = require("supertest");
const models = require("../models");
const server = require("../server/server");

describe("Payment API", () => {
  let app = null;
  let paid = null;

  const serverSettings = {
    port: 3000,
  };

  const container = createContainer();

  container.register({
    validate: asValue(models.validate),
    serverSettings: asValue(serverSettings),
    stripe: asValue(stripe(stripeSettings.secret)),
  });

  let _testRepo = {
    registerPurchase({ container }, payment) {
      return new Promise((resolve, reject) => {
        container.cradle.stripe.charges.create(
          {
            amount: Math.ceil(payment.amount * 100),
            currency: payment.currency,
            metadata: payment.metadata,
            source: payment.source,
            description: payment.description,
          },
          (err, charge) => {
            if (err && err.type === "StripeCardError") {
              reject(
                new Error(
                  "An error occurred processing payment with stripe, err: " +
                    err
                )
              );
            } else {
              const paid = Object.assign(
                {},
                { user: payment.userName, amount: payment.amount, charge }
              );
              resolve(paid);
            }
          }
        );
      });
    },
    getPurchaseById({ container }, orderId) {
      return new Promise((resolve, reject) => {
        container.cradle.stripe.charges.retrieve(orderId, (err, charge) => {
          if (err) {
            console.info(err);
            reject(err);
          } else {
            resolve(charge);
          }
        });
      });
    },
  };

  const testRepo = {};

  testRepo.registerPurchase = _testRepo.registerPurchase.bind(null, {
    container,
  });
  testRepo.getPurchaseById = _testRepo.getPurchaseById.bind(null, {
    container,
  });

  // container.registerValue({ repo: testRepo });
  container.register({ testRepo: asValue(testRepo) });

  beforeEach(() => {
    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it("can make a purchase", (done) => {
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

    request(app)
      .post("/payment/makePurchase")
      .send({ paymentOrder: testPayment })
      .expect((res) => {
        should.ok(res.body.paid);
        paid = res.body.paid;
      })
      .expect(200, done);
  });

  it("can get purchase", (done) => {
    request(app)
      .get("/payment/getPurchaseById/" + paid.charge.id)
      .expect((res) => {
        should.ok(res.body.payment);
        should.equal(res.body.payment.amount, 1 * 100);
      })
      .expect(200, done);
  });
});
