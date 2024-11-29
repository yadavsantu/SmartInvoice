const Joi = require('joi');

const   validateUser = (req, res, next) => {
    const Schema = Joi.object({
        
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).alphanum().required(),
      repeat_password: Joi.ref("password"),
    });
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Bad Request", error });
    }
    next();
  }
  module.exports = validateUser;