import axios from "../utils/axiosConfig";

export async function getAllUsers(userId) {
  const response = await axios.get("/api/user/" + userId + "/profile");
  return response.data;
}

export async function getAllFriends(user) {
  const response = await axios.get("/api/user/friends");
  return response.data;
}
