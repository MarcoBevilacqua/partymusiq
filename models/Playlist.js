const Joi = require("joi");

const PlaylistSchema = {
  playlistCreate: Joi.object({
    partyId: Joi.string().required(),
    tracks: Joi.array().required(),
  }),
  playlistUpdate: Joi.object({
    tracks: Joi.array().required(),
  }),
};

module.exports = PlaylistSchema;
