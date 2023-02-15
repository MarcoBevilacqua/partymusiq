const Joi = require("joi");

const UserSchema = {
  userCreate: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports = UserSchema;
