const Joi = require("joi").extend(require("@joi/date"));

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
      .format("DD-MM-YYYY HH:mm")
      .error((errors) => {
        return errors;
      }),
    mood: Joi.number()
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
