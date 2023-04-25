const Joi = require("@hapi/joi");
const invitationHandler = require("../handlers/Invitation");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  name: "invitation controller",
  register: async (server, options) => {
    /**
     * Get all parties
     */
    server.route({
      method: "GET",
      path: "/invitation",
      options: {
        auth: { mode: "try" },
      },
      handler: invitationHandler.getInvitations,
    });
  },
};
