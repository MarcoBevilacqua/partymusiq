import axios from "axios";

export async function searchMusicForPlaylist(search) {
  const response = await axios.get("/api/mu?search=" + search);
  return response.data;
}

export async function addSongToPlaylist(partyId, songList) {
  const response = await axios.put("/api/party/" + partyId, {
    playlist: songList,
  });
  return response.data;
}

export async function removeSongFromPlaylist(partyId, song) {
  const response = await axios.put("/api/party/" + partyId + "/playlist", {
    song: song,
  });
  return response.data;
}
