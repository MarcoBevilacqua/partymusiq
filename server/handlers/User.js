"use strict";

module.exports = {
  inviteToParty: async (request, h) => {
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
      .findOneAndUpdate(
        { _id: new ObjectID(request.params.partyId) },
        { $push: { invitation: { user: user, status: "pending" } } }
      );

    return party;
  },
  profile: async (request, h) => {
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
};
