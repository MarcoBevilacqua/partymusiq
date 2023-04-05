"use strict";
const userHandlers = require("../handlers/User");

user.exports = {
  register: async (server, options) => {
    /**
     * invite user to party
     */
    server.route({
      method: "POST",
      path: "/user/{partyId}/invite",
      options: {
        validate: {
          params: Joi.object({
            partyId: Joi.objectId(),
          }),
        },
      },
      handler: userHandlers.inviteToParty,
    });

    /**
     * Get user profile
     */
    server.route({
      method: "GET",
      path: "/user/profile",
      options: {
        auth: { mode: "try" },
      },
      handler: userHandlers.profile,
    });
    server.route({});
  },
};
