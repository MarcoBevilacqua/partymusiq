"use strict";

module.exports = {
  getParties: async (request, h) => {
    const offset = Number(request.query.offset) || 0;
    console.log(request.auth.credentials.username);
    const parties = await request.mongo.db
      .collection("parties")
      .find({
        starting: { $gt: new Date() },
        "host.name": request.auth.credentials.username,
      })
      .sort({ starting: 1 })
      .skip(offset)
      .limit(20)
      .toArray();
    return parties;
  },

  getParty: async (request, h) => {
    const id = request.params.id;
    const ObjectID = request.mongo.ObjectID;
    const party = await request.mongo.db
      .collection("parties")
      .findOne({ _id: new ObjectID(id) }, { projection: { title: 1, description: 1, playlist: 1, invitation: 1 } });
    return party;
  },

  createParty: async (request, h) => {
    const payload = request.payload;
    const host = await request.mongo.db.collection("users").findOne(
      {
        username: request.auth.credentials.username,
      },
      { projection: { username: 1, _id: 1 } }
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

  deleteParty: async (request, h) => {
    const id = request.params.id;
    const ObjectID = request.mongo.ObjectID;
    const status = await request.mongo.db.collection("parties").deleteOne({ _id: ObjectID(id) });
    return status;
  },
};
