import axios from "axios";

// Development: use localhost backend
// Production: use deployed Render backend
const API_BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://formassist.onrender.com/api"
  : "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Extract Keywords
export const extractKeywords = async (text) => {
  const res = await API.post("/speech/extract", {
    text: text,
  });

  return res.data;
};

// ✅ Save Form
export const saveForm = async (formData) => {
  const res = await API.post("/form", formData);
  return res.data;
};