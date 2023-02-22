const Joi = require("joi");

const PartySchema = {
  create: Joi.object({
    title: Joi.string()
      .required()
      .error((errors) => {
        return errors;
      }),
    starting: Joi.date()
      .required()
      .greater("now")
      .error((errors) => {
        return errors;
      }),
    host: Joi.string()
      .required()
      .error((errors) => {
        return errors;
      }),
  }),
  update: Joi.object({
    playlist: Joi.array().required(),
  }),
};

module.exports = PartySchema;
