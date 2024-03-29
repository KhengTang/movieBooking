// const bookingSchema = (joi) => ({
//   city: joi.string(),
//   cinema: joi.string(),
//   schedule: joi.string(),
//   movie: joi.string(),
//   cinemaRoom: joi.number(),
//   seats: joi.array().items(joi.string()).single(),
//   totalAmount: joi.number(),
// });

// module.exports = bookingSchema;
const now = new Date();
const bookingSchema = (joi) => ({
  city: joi.string(),
  cinema: joi.string(),
  schedule: joi.string(),
  movie: joi.string(),
  cinemaRoom: joi.number(),
  seats: joi.array().items(joi.string()).single(),
  format: joi.string(),
  totalAmount: joi.number(),
});

module.exports = bookingSchema;
