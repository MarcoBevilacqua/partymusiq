import axios from "../utils/axiosConfig";

export async function getAllUsers() {
  const response = await axios.get("/api/user/profile");
  return response.data;
}

export async function getAllFriends(user) {
  const response = await axios.get("/api/user/friends");
  return response.data;
}
