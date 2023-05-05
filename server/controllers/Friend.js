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
      path: "/user/friends",
      options: {
        auth: { mode: "try" },
      },
      handler: friendHandler.getAllFriends,
    });

    /**
     * get all non-friends
     */
    server.route({
      method: "GET",
      path: "/user/nonfriends",
      options: {
        auth: { mode: "try" },
      },
      handler: friendHandler.getNonFriends,
    });

    /**
     * add friend
     */
    server.route({
      method: "POST",
      path: "/user/friends",
      options: {
        auth: { mode: "try" },
      },
      handler: friendHandler.addFriend,
    });
  },
};
