import axios from "axios";
import { auth } from "./firebase";

interface UserRegistrationData {
  [key: string]: unknown;
}

interface PredictionData {
  [key: string]: unknown;
}

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// attach firebase token
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

// USERS
export const registerExecutive = (data: UserRegistrationData) =>
  API.post("/users/executive/register", data);

export const registerAnalyst = (data: UserRegistrationData) =>
  API.post("/users/analyst/register", data);

export const getExecutives = () => API.get("/users/executives");

export const getUserProfile = (email: string) =>
  API.get(`/users/profile?email=${email}`);

export const getAnalysts = (executive_email: string) =>
  API.get(`/users/analysts?executive_email=${executive_email}`);

// PREDICTIONS
export const createPrediction = (data: PredictionData) =>
  API.post("/predictions/create", data);

export const getMyPredictions = () =>
  API.get("/predictions/my");

export const getPredictionsByAnalyst = (email: string) =>
  API.get(`/predictions/by-analyst?email=${email}`);

