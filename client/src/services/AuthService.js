import axios from "../utils/axiosConfig";

export async function login(loginData) {
  const response = await axios.post("/api/auth/login", loginData);
  return response;
}

export async function register(registrationData) {
  const response = await axios.post(`/api/auth/register`, registrationData);
  return response.data;
}

export async function logout(id) {
  const response = await axios.get("/api/auth/logout/" + id);
  return response.data;
}
