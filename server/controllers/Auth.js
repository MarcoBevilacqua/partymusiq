"use strict";

const authHandlers = require("../handlers/Auth");

exports.auth = {
  register: async (server, options) => {
    server.route(
      /**
       * register new user
       */
      {
        method: "POST",
        path: "/auth/register",
        options: {
          auth: false,
          validate: {
            payload: userValidateSchema.userCreate,
            failAction: handleError,
          },
        },
        handler: authHandlers.register,
      }
    );
    /**
     * User Login
     */
    server.route({
      method: "POST",
      path: "/login",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.login,
    });

    /**
     * User logout
     */
    server.register({
      method: "GET",
      path: "/logout",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.logout,
    });

    /**
     * Create new user
     */
    server.register({
      method: "GET",
      path: "/check",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.check,
    });
  },
};
