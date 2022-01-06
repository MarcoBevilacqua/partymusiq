const Joi = require("joi");

const PartySchema = {
  partyCreate: Joi.object({
    title: Joi.string().required(),
    starting: Joi.date().required().greater("now"),
    host: Joi.string().required(),
  }),
};

module.exports = PartySchema;
