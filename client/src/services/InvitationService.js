import axios from "axios";
import Invitation from "../constants/Invitation";
export async function getInvitations() {
  const response = await axios.get("/api/invitation");
  return response.data;
}

export async function createInvitation(userId, partyId) {
  const response = await axios.post("api/invitation/" + partyId, {
    user: userId,
    status: Invitation.statuses.PENDING.value,
  });

  return response.data;
}

export async function answerInvitation(partyId, answer) {
  const response = await axios.patch("api/invitation/" + partyId, {
    status: answer,
  });
  return response.data;
}

export async function getAvailableForParty(partyId) {
  const response = await axios.get("api/invitation/" + partyId);
  return response.data;
}

export async function getFriendsForParty(partyId) {
  const response = await axios.get(`api/invitation/${partyId}/friends`);
  return response.data;
}
