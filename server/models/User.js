const Joi = require("joi");

const UserSchema = {
  userCreate: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  }),
};

module.exports = UserSchema;
