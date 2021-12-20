const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

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
    path: "/hello/{user}",
    handler: function (request, h) {
      return `Hello ${request.params.user}!`;
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
    handler: async (request, h) => {
      const payload = request.payload;
      const party = await request.mongo.db.collection("parties").insertOne(payload);
      return party;
    },
  },
  {
    method: "PUT",
    path: "/parties/{id}",
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
    method: "PUT",
    path: "/movies/{id}",
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
];
