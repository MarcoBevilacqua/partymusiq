import axios from "axios";

axios.defaults.withCredentials = true;

export async function getAllParties() {
  const response = await axios.get("/api/party");
  return response.data;
}

export async function createParty(data) {
  const response = await axios.post(`/api/party`, data);
  return response.data;
}

export async function getSingleParty(id) {
  const response = await axios.get("/api/party/" + id);
  return response.data;
}
