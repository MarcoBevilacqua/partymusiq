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
    const friend = await request.mongo.db
      .collection("users")
      .findOne(
        { _id: new ObjectID(request.payload.user) },
        { projection: { _id: 1, username: 1 } }
      );

    if (!friend) {
      return h.response("No user found").code(400);
    }

    return await request.mongo.db.collection("friends").findOneAndUpdate(
      { user: request.auth.credentials.username },
      {
        $addToSet: {
          friends: friend,
        },
      },
      { returnDocument: "after", upsert: true }
    );
  },

  getNonFriends: async (request, h) => {
    const userFriends = await request.mongo.db
      .collection("friends")
      .find(
        {
          user: request.auth.credentials.username,
        },
        { projection: { "friends.username": 1, "friends._id": 1 } }
      )
      .limit(25)
      .toArray();

    //if user does not have friends, return a bunch of users
    if (!userFriends.hasOwnProperty("friends")) {
      console.log("No friends retrieved, returning all users...");
      return await request.mongo.db
        .collection("users")
        .find({
          username: { $ne: request.auth.credentials.username },
        })
        .limit(25)
        .toArray();
    }

    console.log("gettin NON friends...");

    //users has some friends, show non friends
    const nonFriends = await request.mongo.db
      .collection("users")
      .find({
        username: {
          $ne: request.auth.credentials.username,
          $nin: userFriends.friends.map((f) => f.username),
        },
      })
      .limit(25)
      .toArray();

    return await nonFriends;
  },
};
