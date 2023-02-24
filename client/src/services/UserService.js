import axios from "axios";

export async function getAllUsers() {
  const response = await axios.get("/api/user");
  return response.data;
}
