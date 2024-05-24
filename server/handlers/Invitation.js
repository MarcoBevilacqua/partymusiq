"use strict";

const friendsHandler = require("../handlers/Friend");

module.exports = {
  /**
   * get all invitations
   *
   * @param {*} request
   * @param {*} h
   * @returns {Array}
   */
  getInvitations: async (request, h) => {
    let invitations,
      uninvitedFriends,
      users = [];

    const offset = Number(request.query.offset) || 0;
    console.log("Getting all invitations...");
    invitations = await request.mongo.db
      .collection("invitations")
      .find({
        "party.starting": { $gt: new Date() },
        "user.username": request.auth.credentials.username,
      })
      .skip(offset)
      .limit(20)
      .toArray();

    console.log("Invitations: ", invitations);

    // get uninvited friends list
    uninvitedFriends = await friendsHandler.getAllFriends(request).then((f) => {
      console.log("F: ", f);
      return f.map((ftv) => {
        return { ...ftv, invited: !alreadyInvited.includes(ftv) };
      });
    });

    console.log("UninvitedFriends: ", uninvitedFriends);

    // get users list
    users = await friendsHandler.getNonFriends(request).then((nf) => {
      console.log("NON FRIENDS: ", nf);
      return nf.map((nonFriend) => {
        return {
          ...nonFriend,
          users:
            !uninvitedFriends.includes(nonFriend) &&
            !invitations.includes(nonFriend),
        };
      });
    });

    return {
      invitations: invitations,
      uninvitedFriends: uninvitedFriends,
      users: users,
    };
  },

  getUsersToInvite: async (request, h) => {
    const ObjectID = request.mongo.ObjectID;
    const partyId = request.params.partyId;

    console.log(
      `Getting all friends not invited in party with ID ${partyId}...  `
    );
    //get all invitation for the party
    const invitations = await request.mongo.db
      .collection("invitations")
      .find(
        {
          "party._id": ObjectID(partyId),
        },
        { projection: { user: 1 } }
      )
      .limit(25)
      .toArray();

    let alreadyInvited = invitations.length
      ? invitations.map((i) => i.user)
      : [];
    console.log("Already invited: ", alreadyInvited);

    //no invitation yet, return all friends
    if (!invitations || !invitations.length) {
      console.log("No invitation whatsoever, retrieving all friends...");
      return (
        (await request.mongo.db.collection("friends").findOne(
          {
            user: request.auth.credentials.username,
          },
          { projection: { friends: 1 } }
        )) || []
      );
    }

    if (!friendsToInvite.friends || !friendsToInvite.friends.length) {
      console.log("no friends in " + friendsToInvite.friends);
      return friendsToInvite;
    }

    return friendsToInvite.friends.map((ftv) => {
      return { ...ftv, invited: !alreadyInvited.includes(ftv) };
    });
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
      return h
        .response("Invalid User from user id " + request.payload.user)
        .code(400);
    }

    const party = await request.mongo.db.collection("parties").findOne(
      { _id: new ObjectID(request.params.partyId) },
      {
        projection: { _id: 1, starting: 1, host: 1, title: 1 },
      }
    );

    if (!party) {
      return h
        .response("Invalid Party from party id " + request.params.partyId)
        .code(400);
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
    const updatedInvitation = request.mongo.db
      .collection("invitations")
      .findOneAndUpdate(
        {
          _id: { $eq: new ObjectID(invitationId) },
        },
        { $addToSet: { "invitation.$.status": request.payload.status } }
      );
    return updatedInvitation;
  },
};
