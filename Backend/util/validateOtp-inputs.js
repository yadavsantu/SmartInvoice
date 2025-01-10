const Joi = require("joi");

const validateInpus = (req, res, next) => {
  const Schema = Joi.object({
    otp: Joi.number().required(),
  });
  const { error, value } = Schema.validate(req.body);

  if (error)
    return res.status(400).json({ message: "Invalid OTP Format", error });
};

module.exports = validateInpus;
