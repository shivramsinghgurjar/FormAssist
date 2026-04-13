import axios from "axios";

const AI_SERVICE_URL = "https://formassist-1.onrender.com/extract";

export const extractKeywords = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

    const response = await axios.post(AI_SERVICE_URL, {
      text: text.trim(),
    });

    return res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const errorPayload = err.response?.data || err.message || "AI service request failed";

    console.error("AI SERVICE ERROR:", {
      status,
      url: AI_SERVICE_URL,
      error: errorPayload,
      stack: err.stack,
    });

    return res.status(status).json({
      success: false,
      error: errorPayload,
    });
  }
};
