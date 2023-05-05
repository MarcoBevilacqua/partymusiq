"use strict";
const dateOptions = { weekday: "short", year: "numeric", month: "long", day: "numeric" };

module.exports = {
  getInvitations: async (request, h) => {
    const offset = Number(request.query.offset) || 0;

    return await request.mongo.db
      .collection("invitations")
      .find({
        "party.starting": { $gt: new Date() },
        "user.username": request.auth.credentials.username,
      })
      .skip(offset)
      .limit(20)
      .toArray();
  },

  getUsersToInvite: async (request, h) => {
    const offset = Number(request.query.offset) || 0;
    const ObjectID = request.mongo.ObjectID;
    const partyId = request.params.partyId;

    const invitations = await request.mongo.db
      .collection("invitations")
      .find(
        {
          "party._id": ObjectID(partyId),
        },
        { projection: { user: 1 } }
      )
      .limit(20)
      .toArray();

    const xx = invitations.map((i) => i.user._id);
    console.log(xx);

    return await request.mongo.db
      .collection("friends")
      .find(
        {
          user: request.auth.credentials.username,
          $nin: { friends: invitations.map((i) => i.user._id) },
        },
        { projection: { friends: 1 } }
      )
      .limit(20)
      .toArray();
  },

  createInvitation: async (request, h) => {
    console.log("Inviting a new guest for party " + request.params.partyId);
    const ObjectID = request.mongo.ObjectID;
    const user = await request.mongo.db.collection("users").findOne(
      { _id: new ObjectID(request.payload.user) },
      {
        projection: { _id: 1, username: 1 },
      }
    );

    if (!user) {
      return h.response("Invalid User from user id " + request.payload.user).code(400);
    }

    const party = await request.mongo.db.collection("parties").findOne(
      { _id: new ObjectID(request.params.partyId) },
      {
        projection: { _id: 1, starting: 1, host: 1, title: 1 },
      }
    );

    if (!party) {
      return h.response("Invalid Party from party id " + request.params.partyId).code(400);
    }

    return await request.mongo.db.collection("invitations").updateOne(
      { user: user },
      {
        $set: {
          status: request.payload.status,
          party: party,
        },
      },
      { upsert: true }
    );
  },

  updateInvitation: async (request, h) => {
    const invitationId = request.params.invitationId;
    console.log("update invitation with ID " + invitationId);
    const ObjectID = request.mongo.ObjectID;
    const updatedInvitation = request.mongo.db.collection("invitations").findOneAndUpdate(
      {
        _id: { $eq: new ObjectID(invitationId) },
      },
      { $addToSet: { "invitation.$.status": request.payload.status } }
    );
    return updatedInvitation;
  },
};
