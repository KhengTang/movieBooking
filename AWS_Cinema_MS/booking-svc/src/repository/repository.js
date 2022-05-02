"use strict";
const repository = (container) => {
  const { database: db } = container.cradle;
  const cinemaDB = db.db("cinemas");
  const bookingCollection = cinemaDB.collection("booking");
  const ticketsCollection = cinemaDB.collection("tickets");

  const makeBooking = (user, booking) => {
    return new Promise((resolve, reject) => {
      // const payload = {
      //   city: booking.city,
      //   userType: user.membership ? "loyal" : "normal",
      //   totalAmount: booking.totalAmount,
      //   cinema: {
      //     name: booking.cinema,
      //     room: booking.cinemaRoom,
      //     seats: booking.seats.toString(),
      //   },
      //   movie: {
      //     title: booking.movie.title,
      //     format: booking.movie.format,
      //     schedule: booking.schedule,
      //   },
      // };
      const payload = {
        city: booking.city,
        cinema: booking.cinema,
        book: {
          userType: user.membership ? "loyal" : "normal",
          movie: {
            title: booking.movie.title,
            format: booking.movie.format,
            schedule: booking.schedule,
          },
        },
      };

      console.info("repository.js - hit make booking \n" + payload);

      bookingCollection.insertOne(payload, (err, booked) => {
        console.info("repository.js - hit booking Collection \n" + payload);
        if (err) {
          reject(
            new Error(
              "An error occurred registering a user booking, err:" + err
            )
          );
        }
        resolve(payload);
      });
    });
  };

  // const generateTicket = (paid, booking) => {
  //   return new Promise((resolve, reject) => {
  //     console.log("booking-service,received paid", paid);
  //     console.log("booking-service,received booking", booking);
  //     const payload = Object.assign({}, booking, {
  //       orderId: paid.charge.id,
  //       description: paid.charge.description,
  //     });
  //     ticketsCollection.insertOne(payload, (err, ticket) => {
  //       if (err) {
  //         reject(
  //           new Error("an error occurred registering a ticket, err:" + err)
  //         );
  //       }
  //       resolve(payload);
  //     });
  //   });
  // };

  const generateTicket = (paid, booking) => {
    return new Promise((resolve, reject) => {
      //     console.log("booking-service,received paid", paid);
      //     console.log("booking-service,received booking", booking);
      const payload = Object.assign({}, { booking, orderId: paid._id });
      ticketsCollection.insertOne(payload, (err, ticket) => {
        if (err) {
          reject(
            new Error("an error occurred registering a ticket, err:" + err)
          );
        }
        resolve(payload);
      });
    });
  };

  // const getOrderById = (orderId) => {
  //   return new Promise((resolve, reject) => {
  //     const ObjectID = container.resolve("ObjectID");
  //     const query = { _id: new ObjectID(orderId) };
  //     const response = (err, order) => {
  //       if (err) {
  //         reject(
  //           new Error("An error occurred retrieving a order, err: " + err)
  //         );
  //       }
  //       resolve(order);
  //     };
  //     bookingCollection.findOne(query, {}, response);
  //   });
  // };

  const getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
      const ObjectID = container.resolve("ObjectID");
      const query = { _id: new ObjectID(orderId) };
      const response = (err, order) => {
        if (err) {
          reject(
            new Error("An error occurred retrieving a order, err: " + err)
          );
        }
        resolve(order);
      };
      bookingCollection.findOne(query, {}, response);
    });
  };

  const disconnect = () => {
    moviesDB.close();
  };

  return Object.create({
    makeBooking,
    getOrderById,
    generateTicket,
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
