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
    console.info("Starting At booking.js=============================>");
    console.info("req obj: " + JSON.stringify(req.body));
    console.info("req booking obj : " + JSON.stringify(req.body.booking));
    console.info("req user obj : " + JSON.stringify(req.body.user) + "\n\n");
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
          "Aft valid, const payment obj - " + JSON.stringify(payment) + "\n\n"
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
        //
        //
        //Debug
        console.info(
          "Aft paymentSvc, const user - " +
            JSON.stringify(user) +
            "\booking obj - " +
            JSON.stringify(booking) +
            "\n\n"
        );
        return Promise.all([
          repo.makeBooking(user, booking),
          // repo.generateTicket(paid, booking),
          Promise.resolve(paid),
          Promise.resolve(user),
          console.info(
            "Aft makeBooking, const user - " +
              JSON.stringify(user) +
              "\n paid obj - " +
              JSON.stringify(paid) +
              "\n\n"
          ),
        ]);
      })
      .then(([booking, paid, user]) => {
        return Promise.all([
          repo.generateTicket(paid, booking),
          Promise.resolve(user),
          console.info(
            "Aft generateTic, const paid - " +
              JSON.stringify(paid) +
              "\n booking obj - " +
              JSON.stringify(booking) +
              "\n user obj - " +
              JSON.stringify(user) +
              "\n\n"
          ),
        ]);
      })
      .then(([ticket, user]) => {
        const payload = Object.assign({}, ticket, {
          user: { name: user.name + user.lastName, email: user.email },
        });
        notificationService(payload);
        console.info(
          "End ===================>\n" +
            "Aft notficationSvc, const payload - " +
            JSON.stringify(payload) +
            "\n\n"
        );
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
