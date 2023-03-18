import axios from "axios";
axios.defaults.withCredentials = true;
export async function getAllUsers() {
  const response = await axios.get("/api/user");
  return response.data;
}
