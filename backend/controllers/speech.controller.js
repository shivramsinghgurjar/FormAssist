import axios from "axios";

export const extractKeywords = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

    const response = await axios.post(
      "https://formassist-1.onrender.com/api/extract",
      {
        text: text.trim(),
      },
    );

    // ✅ FORCE JSON RESPONSE
    return res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error("AI ERROR FULL:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: err.response?.data || "AI failed",
    });
  }
};
