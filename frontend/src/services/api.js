import axios from "axios";

const API = axios.create({
  baseURL: "https://formassist.onrender.com", // your backend
});

export const extractData = async (text) => {
  const res = await API.post("/extract", {
    text: text, // matches backend
  });

  return res.data;
};