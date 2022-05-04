const paymentSchema = (joi) => ({
  metadata: joi
    .object()
    .keys({
      name: joi.string(),
    })
    .required(),
  currency: joi.string(),
  source: joi.string(),
  amount: joi.number(),
  description: joi.string(),
});

module.exports = paymentSchema;
