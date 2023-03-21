import axios from "../utils/axiosConfig";

export async function login(loginData) {
  const response = await axios.post("/api/auth/login", loginData);
  return response;
}

export async function register(registrationData) {
  const response = await axios.post(`/api/auth/register`, registrationData);
  return response.data;
}

export async function logout() {
  const response = await axios.get("/api/auth/logout");
  return response.data;
}

export async function heartbeat() {
  const response = await axios.get("/api/auth/check");
  return response.data;
}
