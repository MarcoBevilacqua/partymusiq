import axios from "../utils/axiosConfig";

export async function getAllUsers() {
  const response = await axios.get("/api/user/profile");
  return response.data;
}

export async function addFriend(userId) {
  const response = await axios.post("api/user/friends", {
    user: userId,
  });
  return response.data;
}

export async function getAllFriends(user) {
  const response = await axios.get("/api/user/friends");
  return response.data;
}

export async function getNonFriends(user) {
  const response = await axios.get("/api/user/nonfriends");
  return response.data;
}
