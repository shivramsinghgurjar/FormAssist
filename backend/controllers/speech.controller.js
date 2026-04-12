import axios from "axios";

export const extractKeywords = async (req, res) => {
  try {
    // Validate input
    const { text } = req.body;
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Text field is required and cannot be empty",
      });
    }

    // Call AI service (FIXED BODY KEY)
    const response = await axios.post(
      "https://formassist-1.onrender.com/extract",
      {
        input: text.trim(), // ✅ FIXED (text → input)
      }
    );

    // Return extracted data exactly as AI layer returns
    return res.json(response.data);

  } catch (err) {
    // 🔥 FULL DEBUG LOG (VERY IMPORTANT)
    console.error("AI ERROR FULL:", err.response?.data || err.message);

    // Check if AI service is unreachable
    if (err.code === "ECONNREFUSED" || err.code === "ENOTFOUND") {
      return res.status(503).json({
        success: false,
        error: "AI service is not running. Make sure Python FastAPI is running on port 8000.",
      });
    }

    // Return actual backend error (not generic)
    return res.status(500).json({
      success: false,
      error: err.response?.data || "Failed to extract keywords",
    });
  }
};