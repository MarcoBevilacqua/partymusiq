import axios from "axios";

export async function getInvitations() {
  const response = await axios.get("/api/invitation");
  return response.data;
}

export async function answerInvitation(partyId, answer) {
  const response = await axios.patch("api/invitation/" + partyId, {
    status: answer,
  });
  return response.data;
}
