import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "https://formassist-1.onrender.com/extract";

export const extractKeywords = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: "Text is required and cannot be empty",
      });
    }

    console.log("📤 Calling AI service:", AI_SERVICE_URL);
    console.log("📝 Input text:", text.trim());

    const response = await axios.post(
      AI_SERVICE_URL,
      { text: text.trim() },
      { timeout: 30000 }
    );

    console.log("✅ AI service response received:", response.data);

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

    console.error("❌ AI SERVICE ERROR:", {
      status,
      url: AI_SERVICE_URL,
      error: errorMessage,
      code: err.code,
      message: err.message,
    });

    return res.status(status).json({
      success: false,
      error: errorMessage,
    });
  }
};
