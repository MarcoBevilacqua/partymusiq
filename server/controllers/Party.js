const Joi = require("@hapi/joi");
const partyHandlers = require("../handlers/Party");
Joi.objectId = require("joi-objectid")(Joi);

const partyValidateSchema = require("../models/Party");

//register /party routes
module.exports = {
  name: "party controller",
  register: async (server, options) => {
    /**
     * Get all parties
     */
    server.route({
      method: "GET",
      path: "/party",
      options: {
        auth: { mode: "try" },
      },
      handler: partyHandlers.getParties,
    });

    /**
     * Get single party
     */
    server.route({
      method: "GET",
      path: "/party/{id}",
      options: {
        auth: {
          mode: "try",
        },
      },
      handler: partyHandlers.getParty,
    });

    /**
     * create new party
     */
    server.route({
      method: "POST",
      path: "/party",
      options: {
        validate: {
          payload: partyValidateSchema.create,
          failAction: options.errorHelper.handle,
        },
      },
      handler: partyHandlers.createParty,
    });

    /**
     * remove party
     */
    server.route({
      method: "DELETE",
      path: "/party/{id}",
      options: {
        validate: {
          params: Joi.object({
            id: Joi.objectId(),
          }),
        },
      },
      handler: partyHandlers.deleteParty,
    });
  },
};
