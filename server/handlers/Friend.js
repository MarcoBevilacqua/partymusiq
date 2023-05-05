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
    const ObjectID = request.mongo.ObjectID;
    return await request.mongo.db.collection("friends").findOneAndUpdate(
      { user: request.auth.credentials.username },
      {
        $addToSet: {
          friends: new ObjectID(request.payload.user),
        },
      },
      { returnDocument: "after", upsert: true }
    );
  },

  getNonFriends: async (request, h) => {
    const friends = await request.mongo.db.collection("friends").findOne(
      {
        user: request.auth.credentials.username,
      },
      { projection: { friends: 1 } }
    );

    if (!friends) {
      return await request.mongo.db
        .collection("users")
        .find({
          username: { $ne: request.auth.credentials.username },
        })
        .limit(25)
        .toArray();
    }

    return await request.mongo.db
      .collection("users")
      .find({
        username: { $ne: request.auth.credentials.username },
        _id: {
          $nin: friends?.friends.map((f) => new request.mongo.ObjectID(f)),
        },
      })
      .limit(20)
      .toArray();
  },
};
