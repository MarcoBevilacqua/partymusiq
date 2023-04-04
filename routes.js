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
    handler: async (request, h) => {
      const payload = request.payload;
      const inserted = await request.mongo.db.collection("users").insertOne(payload);
      if (!inserted) {
        return h.response().code(500);
      }
      console.log(inserted);
      const user = await request.mongo.db.collection("users").findOne(
        {
          _id: inserted.insertedId,
        },
        { projection: { username: 1 } }
      );

      console.log(user);
      return user;
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    options: {
      auth: { mode: "try" },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      const user = await request.mongo.db.collection("users").findOne({
        username: payload.username,
        password: payload.password,
      });
      if (user) {
        request.cookieAuth.set({ username: user.username });
        return { isValid: true, credentials: { username: user.username } };
      }
    },
  },
  {
    method: "GET",
    path: "/auth/check",
    options: {
      auth: { mode: "try" },
    },
    handler: (request, h) => {
      console.log(request.auth);
      if (!request.auth.isAuthenticated) {
        console.log("User is not authenticated");
        return h.response("Unauthorized").code(401);
      }
      return h.response(request.auth.credentials);
    },
  },
  {
    method: "GET",
    path: "/auth/logout",
    options: {
      auth: { mode: "try" },
    },
    handler: (request, h) => {
      request.cookieAuth.clear();
      return true;
    },
  },
  {
    method: "GET",
    path: "/party",
    options: {
      auth: { mode: "try" },
    },
    handler: async (request, h) => {
      const offset = Number(request.query.offset) || 0;
      const parties = await request.mongo.db
        .collection("parties", { starting: { $gt: new Date() } })
        .find()
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
        .findOne({ _id: new ObjectID(id) }, { projection: { title: 1, description: 1, playlist: 1, invitation: 1 } });
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
      const host = await request.mongo.db.collection("users").findOne(
        {
          username: request.auth.credentials.username,
        },
        { projection: { name: 1, _id: 1 } }
      );
      if (!host) {
        return h.response("No Host available").code(401);
      }
      const party = await request.mongo.db.collection("parties").insertOne({
        title: payload.title,
        starting: payload.starting,
        mood: payload.mood,
        host: host,
      });
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
     * add song to party playlist
     */
    method: "POST",
    path: "/song/vote",
    options: {
      // validate: {
      //   params: Joi.object({
      //     partyId: Joi.objectId(),
      //     songId: Joi.number(),
      //   }),
      // },
    },
    handler: async (request, h) => {
      const payload = request.payload;
      console.log("Voting song with id " + payload.songId + " in party " + payload.partyId);
      const ObjectID = request.mongo.ObjectID;
      const updatedPartyPlaylist = await request.mongo.db
        .collection("parties")
        .findOneAndUpdate(
          { _id: new ObjectID(payload.partyId), "playlist.$": payload.songId },
          { $inc: { "playlist.$.votes": 1 } },
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
     * invite user to party
     */
    method: "POST",
    path: "/party/{partyId}/invite",
    options: {
      validate: {
        params: Joi.object({
          partyId: Joi.objectId(),
        }),
      },
    },
    handler: async (request, h) => {
      console.log("Inviting a new guest for party " + request.params.partyId);
      const ObjectID = request.mongo.ObjectID;
      const user = await request.mongo.db.collection("users").findOne(
        { _id: new ObjectID(request.payload.user) },
        {
          projection: { _id: 1, username: 1, name: 1 },
        }
      );

      if (!user) {
        return h.response("Invalid User from user id " + request.payload.user).code(400);
      }
      const party = await request.mongo.db
        .collection("parties")
        .findOneAndUpdate({ _id: new ObjectID(request.params.partyId) }, { $push: { invitation: user } });

      return party;
    },
  },

  {
    method: "GET",
    path: "/user/profile",
    options: {
      auth: { mode: "try" },
    },
    handler: async (request, h) => {
      if (!request.auth.isAuthenticated) {
        return h.response("Not Authenticated").code(401);
      }
      const offset = Number(request.query.offset) || 0;
      const users = await request.mongo.db
        .collection("users")
        .find({ username: { $ne: request.auth.credentials.username } })
        .sort({ metacritic: -1 })
        .skip(offset)
        .limit(20)
        .toArray();
      return users;
    },
  },
];
