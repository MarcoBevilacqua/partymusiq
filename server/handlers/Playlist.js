"use strict";

module.exports = {
  add: async (request, h) => {
    console.log("Updating party with id " + request.params.partyId);
    const payload = request.payload;
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(request.params.partyId) },
        { $push: { playlist: payload.playlist[0] } },
        { returnDocument: "after" }
      );
    return updatedPartyPlaylist;
  },
  remove: async (request, h) => {
    console.log("Updating playlist for party " + request.params.partyId);
    const song = request.payload.song;
    console.log("Removing song " + song);
    const ObjectID = request.mongo.ObjectID;
    const party = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(request.params.partyId) },
        { $pull: { playlist: { $eq: song } } },
        { returnDocument: "after" }
      );

    return party;
  },
  upvote: async (request, h) => {
    const payload = request.payload;
    console.log("Voting song with id " + payload.songId + " in party " + payload.partyId);
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(payload.partyId), "playlist.$": payload.songId },
        { $inc: { "playlist.$.votes": 1 } },
        { returnDocument: "after" }
      );
    return updatedPartyPlaylist;
  },
  downvote: async (request, h) => {
    const payload = request.payload;
    console.log("Voting song with id " + payload.songId + " in party " + payload.partyId);
    const ObjectID = request.mongo.ObjectID;
    const updatedPartyPlaylist = await request.mongo.db
      .collection("parties")
      .findOneAndUpdate(
        { _id: new ObjectID(payload.partyId), "playlist.$": payload.songId },
        { $inc: { "playlist.$.votes": 1 } },
        { returnDocument: "after" }
      );
    return updatedPartyPlaylist;
  },
};
