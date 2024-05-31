const Joi = require("@hapi/joi");
const invitationHandler = require("../handlers/Invitation");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  name: "invitation controller",
  register: async (server, options) => {
    /**
     * Get all invitation to party
     */
    server.route({
      method: "GET",
      path: "/invitation/{partyId}",
      options: {
        auth: { mode: "try" },
      },
      handler: invitationHandler.getInvitations,
    });
    /**
     * invite user to party
     */
    server.route({
      method: "POST",
      path: "/invitation/{partyId}",
      options: {
        validate: {
          params: Joi.object({
            partyId: Joi.objectId(),
          }),
        },
      },
      handler: invitationHandler.createInvitation,
    });

    /**
     * accept or decline invitation
     */
    server.route({
      method: "PATCH",
      path: "/invitation/{invitationId}",
      options: {
        auth: { mode: "try" },
      },
      handler: invitationHandler.updateInvitation,
    });
  },
};
