"use strict";

const playlistHandlers = require("../handlers/Playlist");

exports.playlist = {
  register: async (server, options) => {
    server.route({
      /**
       * add song to party playlist
       */
      method: "POST",
      path: "/playlist/{partyId}",
      options: {
        validate: {
          params: Joi.object({
            partyId: Joi.objectId(),
          }),
        },
      },
      handler: playlistHandlers.add,
    });

    server.route({
      /**
       * remove song from party playlist
       */
      method: "DELETE",
      path: "/playlist/{partyId}",
      options: {
        validate: {
          params: Joi.object({
            partyId: Joi.objectId(),
          }),
        },
      },
      handler: playlistHandlers.remove,
    });

    /**
     * upvote song in playlist
     */
    server.route({
      method: "PATCH",
      path: "/playlist/{partyId}",
      handler: playlistHandlers.upvote,
    });

    /**
     * downvote song in playlist
     */
    server.route({
      method: "PUT",
      path: "/playlist/{partyId}",
      handler: playlistHandlers.upvote,
    });
  },
};
