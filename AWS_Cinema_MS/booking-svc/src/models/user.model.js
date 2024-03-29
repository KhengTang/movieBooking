// const userSchema = (joi) => ({
//   name: joi
//     .string()
//     .regex(/^[a-zA-Z '-]+$/i)
//     .required(),
//   lastName: joi
//     .string()
//     .regex(/^[a-zA-Z '-]+$/i)
//     .required(),
//   email: joi.string().email().required(),
//   phoneNumber: joi
//     .string()
//     .regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
//   creditCard: joi.object().keys({
//     number: joi.number().required(),
//     cvc: joi.number(),
//     exp_month: joi.number(),
//     exp_year: joi.number(),
//   }),
//   membership: joi.string().creditCard(),
// });

// module.exports = userSchema;
const userSchema = (joi) => ({
  name: joi
    .string()
    .regex(/^[a-zA-Z '-]+$/i)
    .required(),
  lastName: joi
    .string()
    .regex(/^[a-zA-Z '-]+$/i)
    .required(),
  email: joi.string().email().required(),
  phoneNumber: joi
    .string()
    .regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  membership: joi.string(),
});

module.exports = userSchema;
