import axios from "axios";

const API = axios.create({
  baseURL: "https://formassist.onrender.com/api", // ✅ ADD /api
});

export const extractKeywords = async (text) => {
  const res = await API.post("/extract", {
    text: text,
  });

  return res.data;
};

// ✅ Save Form
export const saveForm = async (formData) => {
  const res = await API.post("/form", formData);
  return res.data;
};