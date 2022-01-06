const Joi = require("joi");

const PartySchema = {
  partyCreate: Joi.object({
    title: Joi.string().required(),
    starting: Joi.date().required().greater("now"),
    users: Joi.array().items(Joi.link("#user")),
  }),
};

module.exports = PartySchema;
