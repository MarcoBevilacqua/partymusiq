import axios from "../utils/axiosConfig";

export async function upvoteSong(partyId, songIdx) {
  const response = await axios.patch("/api/song/vote", {
    partyId: partyId,
    songId: songIdx,
  });
  return response.data;
}

export async function downvoteSong(partyId, songIdx) {
  const response = await axios.put("/api/song/vote", {
    partyId: partyId,
    songId: songIdx,
  });
  return response.data;
}
