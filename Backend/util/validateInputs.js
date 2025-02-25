const Joi = require("joi");

const validateInputs = (req, res, next) => {
  console.log("Validating Inputs");
  try {
    if (typeof req.body.items === "string") {
      req.body.items = JSON.parse(req.body.items);
    }

    const Schema = Joi.object({
      invoiceNumber: Joi.number().required(),
      from: Joi.string().required(),
      billTo: Joi.string().required(),
      shipTo: Joi.string().optional(),
      date: Joi.date().required(),
      email: Joi.string().optional(),
      dueDate: Joi.date().required(),
      notes: Joi.string().required(),
      terms: Joi.string().required(),
      taxRate: Joi.number().precision(2).optional(),
      discount: Joi.number().precision(2).optional(),
      shipping: Joi.number().precision(2).optional(),
      amountPaid: Joi.number().precision(2).required(),
      items: Joi.array()
        .items(
          Joi.object({
            description: Joi.string().required(),
            quantity: Joi.number().required(),
            rate: Joi.number().precision(2).required(),
            amount: Joi.number().precision(2).required(),
          })
        )
        .required(),
      currency: Joi.string().required(),
      total: Joi.number().precision(2).required(),
      balanceDue: Joi.number().precision(2).required(),
    });

    const { error } = Schema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.details });
    }

 next();
  } catch (err) {
    console.error("Validation Middleware Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = validateInputs;
