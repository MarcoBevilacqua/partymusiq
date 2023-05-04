"use strict";

module.exports = {
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
