const Joi = require("joi");

const validateInputs = (req, res, next) => {
  const Schema = Joi.object({
    invoiceID: Joi.number().required(),
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    shipTo: Joi.string().optional(),
    issuedDate: Joi.date().required(),
    paymentTerms: Joi.string().optional(),
    dueDate: Joi.date().required(),
    notes: Joi.string().required(),
    termsAndCondition: Joi.string().required(),
    subTotal: Joi.number().precision(2).required(),
    tax: Joi.number().precision(2).optional(),
    discount: Joi.number().precision(2).optional(),
    shippingCharges: Joi.number().precision(2).optional(),
    total: Joi.number().precision(2).required(),
    previousPaid: Joi.number().precision(2).required(),
    previousDue: Joi.number().precision(2).required(),
    itemDescription: Joi.string().required(),
    itemQuantity: Joi.number().required(),
    itemRate: Joi.number().precision(2).required(),
    itemAmount: Joi.number().precision(2).required(),
  });

  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Error Bad request",error });
  }
  next();
};

module.exports = validateInputs;
