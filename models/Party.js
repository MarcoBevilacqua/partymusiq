const Joi = require("joi");

const PartySchema = {
  create: Joi.object({
    title: Joi.string().required(),
    starting: Joi.date().required().greater("now"),
    host: Joi.string().required(),
  }),
  update: Joi.object({
    playlist: Joi.array().required(),
  }),
};

module.exports = PartySchema;
