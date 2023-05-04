const Joi = require("@hapi/joi");
const friendHandler = require("../handlers/Friend");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  name: "Friend controller",
  register: async (server, options) => {
    /**
     * get all friends
     */

    server.route({
      method: "GET",
      path: "/friend",
      options: {
        auth: { mode: "try" },
      },
      handler: friendHandler.getAllFriends,
    });
  },
};
