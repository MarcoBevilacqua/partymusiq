import axios from "../utils/axiosConfig";

export async function upvoteSong(partyId, songIdx) {
  const response = await axios.post("/api/song/vote", {
    partyId: partyId,
    songId: songIdx,
  });
  return response.data;
}
