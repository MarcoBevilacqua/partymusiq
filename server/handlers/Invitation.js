"use strict";

module.exports = {
  getInvitations: async (request, h) => {
    const offset = Number(request.query.offset) || 0;
    console.log(request.auth.credentials.username);
    const invitiations = await request.mongo.db
      .collection("parties")
      .find({
        starting: { $gt: new Date() },
        "invitation.username": request.auth.credentials.username,
      })
      .sort({ starting: 1 })
      .skip(offset)
      .limit(20)
      .toArray();
    return invitiations;
  },
};
