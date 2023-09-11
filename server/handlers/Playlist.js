"use strict";
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  add: async (request, h) => {
    console.log("Updating party with id " + request.params.partyId);
    const playlistFromRequest = request.payload.playlist.map((item) => {
      return { _id: ObjectId(), title: item, user: request.auth.credentials.username, votes: 0 };
    });
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db.collection("parties").findOneAndUpdate(
      { _id: new ObjectID(request.params.partyId) },
      {
        $addToSet: {
          playlist: { $each: playlistFromRequest },
        },
      },
      { returnDocument: "after" }
    );
    return updatedPartyPlaylist;
  },
  remove: async (request) => {
    console.log("Updating playlist for party " + request.params.partyId);
    const songId = request.params.songId;
    console.log("Removing song " + songId);
    const ObjectID = request.mongo.ObjectID;
    const party = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(request.params.partyId) },
        { $pull: { playlist: { _id: new ObjectID(songId) } } },
        { returnDocument: "after" }
      );

    return party;
  },
  upvote: async (request) => {
    const payload = request.payload;
    console.log("Voting song with id " + payload.songId + " in party " + payload.partyId);
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(payload.partyId), "playlist._id": { $eq: new ObjectID(payload.songId) } },
        { $inc: { "playlist.$.votes": 1 } },
        { returnDocument: "after" }
      );
    return updatedPartyPlaylist;
  },
  downvote: async (request) => {
    const payload = request.payload;
    console.log("downvoting song with id " + payload.songId + " in party " + payload.partyId);
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(payload.partyId), "playlist._id": { $eq: new ObjectID(payload.songId) } },
        { $inc: { "playlist.$.votes": -1 } },
        { returnDocument: "after" }
      );
    return updatedPartyPlaylist;
  },
};
