"use strict";
const repository = (container) => {
  const { database: db } = container.cradle;
  const cinemaDB = db.db("cinemas");
  const paymentCollection = cinemaDB.collection("payments");

  const makePurchase = (payment) => {
    return new Promise((resolve, reject) => {
      const { stripe } = container.cradle;
      //Charges has been updated to the latest api requirement
      let chargeObj = {
        metadata: {
          name: payment.metadata.name,
        },
        currency: payment.currency,
        amount: Math.ceil(payment.amount * 100),
        source: payment.currency,
        description: payment.description,
      };
      console.log("chargeObj", chargeObj);
      stripe.charges.create(chargeObj, (err, charge) => {
        if (err) {
          reject(
            new Error(
              "An error occurred processing payment with stripe, err: " + err
            )
          );
        } else {
          console.log("stripe return value, charge", charge);
          const paid = Object.assign(
            {},
            { user: payment.metadata.name, amount: payment.amount, charge }
          );
          resolve(paid);
        }
      });
    });
  };

  // this the function that our API calls first
  const registerPurchase = (payment) => {
    return new Promise((resolve, reject) => {
      // and here we call the function to execute stripe
      makePurchase(payment)
        .then((paid) => {
          // if every thing is successfully, we make the registry at our db, for the record only
          paymentCollection.insertOne(paid, (err, result) => {
            if (err) {
              reject(
                new Error(
                  "An error occurred registering payment at db, err:" + err
                )
              );
            }
            resolve(paid);
          });
        })
        .catch((err) => reject(err));
    });
  };

  const getPurchaseById = (paymentId) => {
    return new Promise((resolve, reject) => {
      const response = (err, payment) => {
        if (err) {
          reject(
            new Error("An error occurred retrieving a order, err: " + err)
          );
        }
        resolve(payment);
      };
      let parsedPayment = paymentId;
      try {
        parsedPayment = JSON.parse(paymentId);
      } catch (e) {
        console.log("Error parsing json");
      }
      paymentCollection
        .find({ "charge.id": parsedPayment }, { limit: 10 })
        .toArray(response);
    });
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    registerPurchase,
    getPurchaseById,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve("database")) {
      reject(new Error("connection db not supplied!"));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
