import axios from "axios";

export const extractKeywords = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Text field is required and cannot be empty",
      });
    }

    // 🔥 TRY BOTH FORMATS (AUTO FIX)
    let response;

    try {
      // Try with input
      response = await axios.post(
        "https://formassist-1.onrender.com/extract",
        { input: text.trim() }
      );
    } catch (e) {
      // Fallback to text
      response = await axios.post(
        "https://formassist-1.onrender.com/extract",
        { text: text.trim() }
      );
    }

    return res.json(response.data);

  } catch (err) {
    console.error("🔥 AI ERROR FULL:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: err.response?.data || "Failed to extract keywords",
    });
  }
};