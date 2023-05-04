"use strict";

module.exports = {
  getAllFriends: async (request, h) => {
    const offset = Number(request.query.offset) || 0;

    return await request.mongo.db
      .collection("friends")
      .find({
        "user.username": request.auth.credentials.username,
      })
      .skip(offset)
      .limit(20)
      .toArray();
  },

  addFriend: async (request, h) => {
    return await request.mongo.db
      .collection("friends")
      .insertOne(
        { user: request.auth.credentials.username, friend: request.params.userId },
        { returnDocument: "after" }
      );
  },
  getNonFriends: async (request, h) => {
    const friends = request.mongo.db
      .collection("friends")
      .find(
        {
          "user.username": request.auth.credentials.username,
        },
        { projection: { _id: 1 } }
      )
      .toArray();

    return await request.mongo.db
      .collection("users")
      .find({
        $nin: { "user._id": friends.map((f) => f._id) },
      })
      .skip(offset)
      .limit(20)
      .toArray();
  },
};
