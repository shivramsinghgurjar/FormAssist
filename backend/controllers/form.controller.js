import Form from "../models/Form.js";
import { isMongoDBConnected } from "../config/db.js";

export const saveForm = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Form data is required",
      });
    }

    const incomingPayload = req.body?.data || req.body;

    const requiredFields = [
      'name',
      'systemid',
      'rollnumber',
      'year',
      'program',
      'branch',
      'passingyear',
    ];

    const missingFields = requiredFields.filter(
      (field) => !incomingPayload[field] || incomingPayload[field].toString().trim() === ''
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    const formDataToSave = {
      source: incomingPayload.source || "speech-form",
      transcription: incomingPayload.transcription || "",
      extractedData: incomingPayload.extractedData || {
        name: incomingPayload.name,
        systemid: incomingPayload.systemid,
        rollnumber: incomingPayload.rollnumber,
        year: incomingPayload.year,
        program: incomingPayload.program,
        branch: incomingPayload.branch,
        passingyear: incomingPayload.passingyear,
      },
      name: incomingPayload.name || "",
      systemid: incomingPayload.systemid || "",
      rollnumber: incomingPayload.rollnumber || "",
      year: incomingPayload.year || "",
      program: incomingPayload.program || "",
      branch: incomingPayload.branch || "",
      passingyear: incomingPayload.passingyear || "",
      email: incomingPayload.email || "",
      phone: incomingPayload.phone || "",
      date: incomingPayload.date || "",
    };

    if (!isMongoDBConnected()) {
      return res.status(503).json({
        success: false,
        error: "Database connection unavailable",
      });
    }

    const savedForm = await Form.create(formDataToSave);

    return res.json({
      success: true,
      data: savedForm,
      message: "Form submitted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to save form",
    });
  }
};