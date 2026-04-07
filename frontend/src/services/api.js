import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const extractKeywords = (text) =>
  API.post("/speech/extract", { text });

export const saveForm = (data) =>
  API.post("/form", data);