"use strict";

module.exports = {
  getInvitations: async (request, h) => {
    const offset = Number(request.query.offset) || 0;
    console.log(request.auth.credentials.username);
    const invitiations = await request.mongo.db
      .collection("parties")
      .find({
        starting: { $gt: new Date() },
        "invitation.user.username": request.auth.credentials.username,
      })
      .sort({ starting: 1 })
      .skip(offset)
      .limit(20)
      .toArray();
    return invitiations;
  },

  updateInvitation: async (request, h) => {
    const partyId = request.params.partyId;
    console.log("update invitation for party " + partyId);
    const ObjectID = request.mongo.ObjectID;
    const updatedInvitation = request.mongo.db.collection("parties").findOneAndUpdate(
      {
        _id: { $eq: new ObjectID(partyId) },
        "invitation.user.username": { $eq: request.auth.credentials.username },
      },
      { $set: { "invitation.$.status": request.payload.status } }
    );
    return updatedInvitation;
  },
};
