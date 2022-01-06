const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const partyValidateSchema = require("./models/Party");
const userValidateSchema = require("./models/User");
const playlistValidateSchema = require("./models/Playlist");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello Hapi World!";
    },
  },

  {
    method: "GET",
    path: "/party",
    handler: async (request, h) => {
      const offset = Number(request.query.offset) || 0;
      const parties = await request.mongo.db
        .collection("parties")
        .find({})
        .sort({ metacritic: -1 })
        .skip(offset)
        .limit(20)
        .toArray();
      return parties;
    },
  },
  {
    method: "GET",
    path: "/party/{id}",
    handler: async (request, h) => {
      const id = request.params.id;
      const ObjectID = request.mongo.ObjectID;
      const party = await request.mongo.db
        .collection("parties")
        .findOne({ _id: new ObjectID(id) }, { projection: { title: 1, description: 1 } });
      return party;
    },
  },
  {
    method: "POST",
    path: "/party",
    options: {
      validate: {
        payload: partyValidateSchema.partyCreate,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("parties").insertOne(payload);
      return party;
    },
  },
  {
    method: "PUT",
    path: "/party/{id}",
    options: {
      validate: {
        params: Joi.object({
          id: Joi.objectId(),
        }),
      },
    },
    handler: async (request, h) => {
      const id = request.params.id;
      const ObjectID = request.mongo.ObjectID;
      const payload = request.payload;
      const status = await request.mongo.db.collection("parties").updateOne({ _id: ObjectID(id) }, { $set: payload });
      return status;
    },
  },
  {
    method: "DELETE",
    path: "/party/{id}",
    options: {
      validate: {
        params: Joi.object({
          id: Joi.objectId(),
        }),
      },
    },
    handler: async (request, h) => {
      const id = request.params.id;
      const ObjectID = request.mongo.ObjectID;
      const status = await request.mongo.db.collection("parties").deleteOne({ _id: ObjectID(id) });
      return status;
    },
  },
  {
    method: "GET",
    path: "/user",
    handler: async (request, h) => {
      const offset = Number(request.query.offset) || 0;
      const parties = await request.mongo.db
        .collection("users")
        .find({})
        .sort({ metacritic: -1 })
        .skip(offset)
        .limit(20)
        .toArray();
      return parties;
    },
  },
  {
    method: "POST",
    path: "/user",
    options: {
      validate: {
        payload: userValidateSchema.userCreate,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("users").insertOne(payload);
      return party;
    },
  },
  {
    method: "GET",
    path: "/playlist",
    handler: async (request, h) => {
      const offset = Number(request.query.offset) || 0;
      const playlists = await request.mongo.db
        .collection("playlists")
        .find({})
        .sort({ metacritic: -1 })
        .skip(offset)
        .limit(20)
        .toArray();
      return playlists;
    },
  },
  {
    method: "POST",
    path: "/playlist",
    options: {
      validate: {
        payload: playlistValidateSchema.playlistCreate,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const ObjectID = request.mongo.ObjectID;
      const party = await request.mongo.db.collection("parties").findOne({ _id: new ObjectID(payload.partyId) });
      if (!party) {
        return "cannot find party!";
      }
      return await request.mongo.db.collection("playlists").insertOne(payload);
    },
  },
  {
    method: "PUT",
    path: "/playlist/{partyId}",
    options: {
      validate: {
        params: Joi.object({
          partyId: Joi.objectId(),
        }),
        payload: playlistValidateSchema.playlistUpdate,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const updatedPartyPlaylist = await request.mongo.db
        .collection("playlists")
        .findOneAndUpdate({ partyId: request.params.partyId }, { $addToSet: { tracks: { $each: payload.tracks } } });
      return updatedPartyPlaylist;
    },
  },
];
