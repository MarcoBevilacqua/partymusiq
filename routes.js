const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const partyValidateSchema = require("./models/Party");
const userValidateSchema = require("./models/User");

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
        .findOne({ _id: new ObjectID(id) }, { projection: { title: 1, description: 1, host: 1, playlist: 1 } });
      return party;
    },
  },
  {
    method: "POST",
    path: "/party",
    options: {
      validate: {
        payload: partyValidateSchema.create,
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
          { $addToSet: { playlist: { $each: payload.playlist } } }
        );
      return updatedPartyPlaylist;
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
];
