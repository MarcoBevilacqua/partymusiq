import axios from "../utils/axiosConfig";

export async function searchMusicForPlaylist(search) {
  const response = await axios.get("/api/mu?search=" + search);
  return response.data;
}

export async function addSongToPlaylist(partyId, songList) {
  const response = await axios.post("/api/playlist/" + partyId, {
    playlist: songList,
  });
  return response.data;
}

export async function removeSongFromPlaylist(partyId, songId) {
  console.log("removing " + songId);
  const response = await axios.delete(
    "/api/playlist/" + partyId + "/r/" + songId
  );
  return response;
}
