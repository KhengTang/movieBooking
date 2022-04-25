const paymentSchema = (joi) => ({
  metadata: joi
    .object()
    .keys({
      name: joi.string(),
    })
    .required(),
  currency: joi.string().required(),
  source: joi.string().required(),
  amount: joi.number(),
  description: joi.string(),
});

module.exports = paymentSchema;
