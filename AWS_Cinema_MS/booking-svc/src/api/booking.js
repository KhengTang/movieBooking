"use strict";
const status = require("http-status");

module.exports = ({ repo }, app) => {
  app.post("/booking", (req, res, next) => {
    // we grab the dependencies need it for this route
    const validate = req.container.cradle.validate;
    const paymentService = req.container.resolve("paymentService");
    const notificationService = req.container.resolve("notificationService");

    // console.info("booking.js - paymentService info : " + paymentService);
    // console.info("booking.js - notificationService info : " + notificationService);
    console.info("booking.js");
    console.info("req : " + JSON.stringify(req.body));
    console.info("req booking info : " + JSON.stringify(req.body.booking));
    console.info("req user info : " + JSON.stringify(req.body.user) + "\n\n");
    Promise.all([
      validate(req.body.user, "user"),
      validate(req.body.booking, "booking"),
    ])
      .then(([user, booking]) => {
        const payment = {
          metadata: {
            name: user.name + " " + user.lastName,
          },
          currency: "sgd",
          amount: booking.totalAmount,
          source: Math.random() < 0.5 ? "tok_visa" : "tok_mastercard",
          description: `
          Ticket(s) for movie ${booking.movie},
          with seat(s) ${booking.seats.toString()}
          at time ${booking.schedule}`,
        };

        //Debug
        console.info(
          "after validation, constructing payment -\npayment obj - " +
            JSON.stringify(payment)
        );
        return Promise.all([
          // we call the payment service
          // paymentService(payment, headers),
          paymentService(payment),
          Promise.resolve(user),
          Promise.resolve(booking),
        ]);
      })
      .then(([paid, user, booking]) => {
        console.info(
          "after validation, constructing booking -\nuser obj - " +
            JSON.stringify(user) +
            "\nbooking obj - " +
            JSON.stringify(booking)
        );
        return Promise.all([
          // repo.makeBooking(user, booking),
          // Promise.resolve(paid),
          // Promise.resolve(user),
          repo.makeBooking(user, booking),
          repo.generateTicket(paid, booking),
        ]);
      })
      // .then(([booking, paid, user]) => {
      //   console.info(
      //     "after validation, constructing ticket -\npaid obj - " +
      //       JSON.stringify(paid) +
      //       "\nbooking obj - " +
      //       JSON.stringify(booking)
      //   );
      //   return Promise.all([
      //     repo.generateTicket(paid, booking),
      //     Promise.resolve(user),
      //   ]);
      // })
      // .then(([ticket, user]) => {
      //   const payload = Object.assign({}, ticket, {
      //     user: { name: user.name + user.lastName, email: user.email },
      //   });
      //   notificationService(payload, headers);
      //   res.status(status.OK).json(ticket);
      // })
      .then(([booked, ticket]) => {
        // we call the notification service
        notificationService({ booked, ticket });
        res.status(status.OK).json(ticket);
      })
      .catch(next);
  });

  app.get("/booking/verify/:orderId", (req, res, next) => {
    repo
      .getOrderById(req.params.orderId)
      .then((order) => {
        res.status(status.OK).json(order);
      })
      .catch(next);
  });
};
