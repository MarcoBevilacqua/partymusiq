"use strict";
const userValidateSchema = require("../models/User");
const authHandlers = require("../handlers/Auth");

module.exports = {
  name: "auth controller",
  register: async (server, options) => {
    //register new user
    server.route({
      method: "POST",
      path: "/auth/register",
      options: {
        auth: false,
        validate: {
          payload: userValidateSchema.userCreate,
          failAction: options.errorHelper.handle,
        },
      },
      handler: authHandlers.create,
    });

    //user login
    server.route({
      method: "POST",
      path: "/login",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.login,
    });

    //user logout
    server.route({
      method: "GET",
      path: "/logout",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.logout,
    });

    //create user
    server.route({
      method: "GET",
      path: "/check",
      options: {
        auth: { mode: "try" },
      },
      handler: authHandlers.check,
    });
  },
};
