"use strict";

const Joi = require("@hapi/joi");
const userHandlers = require("../handlers/User");

module.exports = {
  name: "User controller",
  register: async (server, options) => {
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
  },
};
