import axios from "axios";

const getAIServiceURL = () => {
  if (process.env.AI_SERVICE_URL) {
    return process.env.AI_SERVICE_URL;
  }
  
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8000/extract";
  }
  
  return "https://formassist-1.onrender.com/extract";
};

export const extractKeywords = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: "Text is required and cannot be empty",
      });
    }

    const AI_SERVICE_URL = getAIServiceURL();

    const response = await axios.post(
      AI_SERVICE_URL,
      { text: text.trim() },
      { timeout: 30000 }
    );

    const extractedData = response.data?.data || response.data || {};

    return res.json({
      success: true,
      data: extractedData,
    });
  } catch (err) {
    const status = err.response?.status || (err.code === "ECONNABORTED" ? 504 : 502);
    const errorMessage = 
      err.response?.data?.detail ||
      err.response?.data?.error ||
      err.message ||
      "AI service is unavailable";

    return res.status(status).json({
      success: false,
      error: errorMessage,
    });
  }
};
