import axios from "axios";

export async function getInvitations() {
  const response = await axios.get("/api/invitation");
  return response.data;
}
