const { payload } = require("@hapi/hapi/lib/validation");
const Joi = require("@hapi/joi");
const fs = require("fs");
const fsMusicFolder = "./client/public/music";
Joi.objectId = require("joi-objectid")(Joi);

const partyValidateSchema = require("./models/Party");
const userValidateSchema = require("./models/User");

const handleError = function (request, h, err) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0];
    return h
      .response(`${JSON.stringify(err.details)}`)
      .code(400)
      .takeover();
  }

  return h.response(err).takeover();
};

module.exports = [
  {
    method: "GET",
    path: "/js/{file*}",
    handler: {
      directory: {
        path: "./client/dist/js",
        listing: true,
      },
    },
  },
  {
    method: "GET",
    path: "/css/{file*}",
    handler: {
      directory: {
        path: "./client/dist/css",
        listing: true,
      },
    },
  },
  {
    method: "GET",
    path: "/mu",
    handler: (request, h) => {
      let allFiles = fs.readdirSync(fsMusicFolder);
      let filterByQuery = allFiles.filter((file) => {
        return file.toLowerCase().startsWith(request.query.search);
      });
      return filterByQuery;
    },
  },
  //AUTH methods
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "everything is fine";
    },
  },
  {
    method: "POST",
    path: "/auth/register",
    options: {
      validate: {
        payload: userValidateSchema.userCreate,
        failAction: handleError,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const user = await request.mongo.db.collection("users").insertOne(payload);
      return user;
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    options: {
      auth: {
        mode: "try",
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const user = await request.mongo.db.collection("users").findOne({
        username: payload.username,
        password: payload.password,
      });
      if (user) {
        request.cookieAuth.set(user);
        return h.response({ isValid: true, credentials: { name: user.name, username: user.username } });
      }
    },
  },
  {
    method: "GET",
    path: "/logout",
    options: {
      handler: (request, h) => {
        request.cookieAuth.clear();
        return true;
      },
    },
  },
  {
    method: "GET",
    path: "/party",
    options: {
      auth: {
        mode: "try",
      },
      plugins: {
        cookie: {
          redirectTo: false,
        },
      },
    },
    handler: async (request, h) => {
      const offset = Number(request.query.offset) || 0;
      const parties = await request.mongo.db
        .collection("parties")
        .aggregate([
          {
            $lookup: {
              from: "users",
              let: { hostId: "$host" },
              pipeline: [{ $project: { name: "$name" } }],
              as: "host",
            },
          },
        ])
        .sort({ starting: 1 })
        .skip(offset)
        .limit(20)
        .toArray();
      return parties;
    },
  },
  {
    method: "GET",
    path: "/party/{id}",
    options: {
      auth: {
        mode: "try",
      },
    },
    handler: async (request, h) => {
      const id = request.params.id;
      const ObjectID = request.mongo.ObjectID;
      const party = await request.mongo.db
        .collection("parties")
        .findOne({ _id: new ObjectID(id) }, { projection: { title: 1, description: 1, playlist: 1 } });
      return party;
    },
  },
  {
    /**
     * create new party
     */
    method: "POST",
    path: "/party",
    options: {
      validate: {
        payload: partyValidateSchema.create,
        failAction: handleError,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("parties").insertOne(payload);
      return party;
    },
  },
  {
    /**
     * add song to party playlist
     */
    method: "PUT",
    path: "/party/{partyId}",
    options: {
      validate: {
        params: Joi.object({
          partyId: Joi.objectId(),
        }),
      },
    },
    handler: async (request, h) => {
      console.log("Updating party with id " + request.params.partyId);
      const payload = request.payload;
      const ObjectID = request.mongo.ObjectID;
      const updatedPartyPlaylist = await request.mongo.db
        .collection("parties")
        .findOneAndUpdate(
          { _id: new ObjectID(request.params.partyId) },
          { $push: { playlist: payload.playlist[0] } },
          { returnDocument: "after" }
        );
      return updatedPartyPlaylist;
    },
  },
  {
    /**
     * remove song from party playlist
     */
    method: "PUT",
    path: "/party/{partyId}/playlist",
    options: {
      validate: {
        params: Joi.object({
          partyId: Joi.objectId(),
        }),
      },
    },
    handler: async (request, h) => {
      console.log("Updating playlist for party " + request.params.partyId);
      const song = request.payload.song;
      console.log("Removing song " + song);
      const ObjectID = request.mongo.ObjectID;
      const party = await request.mongo.db
        .collection("parties")
        .findOneAndUpdate(
          { _id: new ObjectID(request.params.partyId) },
          { $pull: { playlist: { $eq: song } } },
          { returnDocument: "after" }
        );

      return party;
    },
  },
  {
    /**
     * remove party
     */
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
    /**
     * register new user
     */
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
    /**
     * party start reproducing
     */
    method: "POST",
    path: "/party/{partyId}/start",
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("users").insertOne(payload);
      return party;
    },
  },
  {
    /**
     * party pause reproducing
     */
    method: "POST",
    path: "/party/{partyId}/pause",
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("users").insertOne(payload);
      return party;
    },
  },
  {
    /**
     * party stop reproducing
     */
    method: "POST",
    path: "/party/{partyId}/stop",
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("users").insertOne(payload);
      return party;
    },
  },
  {
    /**
     * party skip next song
     */
    method: "POST",
    path: "/party/{partyId}/skip",
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("users").insertOne(payload);
      return party;
    },
  },
];
