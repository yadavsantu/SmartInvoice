const Joi = require("joi");


const validateUser = (req, res, next) => {
  const Schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*]+$')),
    repeat_password: Joi.ref("password"),
  });
  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const validatelogin = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).alphanum().required(),
  });
  const { error, valuue } = Schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", error });
  next();
};

module.exports = {validateUser, validatelogin};
