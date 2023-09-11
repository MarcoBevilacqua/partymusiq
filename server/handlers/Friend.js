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
      .findOne({ _id: new ObjectID(request.payload.user) }, { projection: { _id: 1, username: 1 } });

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
    const userFriends = await request.mongo.db.collection("friends").findOne(
      {
        user: request.auth.credentials.username,
      },
      { projection: { "friends.username": 1 } }
    );

    console.log(userFriends);

    let users = await request.mongo.db
      .collection("users")
      .find(
        {
          username: { $ne: request.auth.credentials.username },
        },
        { projection: { _id: 0, password: 0 } }
      )
      .limit(50)
      .toArray();

    console.log(users);

    if (!userFriends.friends || !userFriends.friends.length) {
      console.log("No friends retrieved, returning all users...");
      return users;
    }

    return users.filter((u) => {
      return !userFriends.friends.map((uf) => uf.username).includes(u.username);
    });
  },
};
