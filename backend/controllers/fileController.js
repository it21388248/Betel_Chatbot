/* const fs = require("fs");
const { extractTextFromPDF } = require("../utils/extractText");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");

async function uploadPDF(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const extractedText = await extractTextFromPDF(req.file.path);
    if (!extractedText || extractedText.length === 0) {
      return res.status(400).json({ error: "No text found in PDF." });
    }

    const embedding = await getEmbedding(extractedText);
    if (!embedding || embedding.length !== 1536) {
      return res.status(400).json({ error: "Embedding generation failed" });
    }

    console.log("📌 Uploading to Pinecone, Embedding Length:", embedding.length);

    const index = getIndex();
    await index.upsert([
      {
        id: req.file.filename,
        values: embedding,
        metadata: { text: extractedText },
      },
    ]);

    return res.json({ message: "PDF uploaded and indexed successfully!" });
  } catch (error) {
    console.error("❌ Error processing PDF:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { uploadPDF };
 */

const fs = require("fs");
const path = require("path");
const { extractTextFromPDF } = require("../utils/extractText");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");

const UPLOADS_DIR = "uploads/"; // 📌 Ensure all uploads are stored

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory storage for uploaded PDFs (use DB in production)
let uploadedFiles = [];

async function uploadPDF(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);
    console.log("📌 Processing file:", filePath);

    const extractedText = await extractTextFromPDF(filePath);
    if (!extractedText || extractedText.length === 0) {
      return res.status(400).json({ error: "No text found in PDF." });
    }

    const embedding = await getEmbedding(extractedText);
    if (!embedding || embedding.length !== 1536) {
      return res.status(400).json({ error: "Embedding generation failed" });
    }

    console.log(
      "📌 Uploading to Pinecone, Embedding Length:",
      embedding.length
    );

    const index = getIndex();
    if (!index) {
      return res.status(500).json({ error: "Pinecone index not found" });
    }

    // Store the uploaded file details in Pinecone
    await index.upsert([
      {
        id: req.file.filename,
        values: embedding,
        metadata: {
          text: extractedText,
          filename: req.file.originalname,
          timestamp: Date.now(),
        },
      },
    ]);

    // Store file metadata
    uploadedFiles.push({
      filename: req.file.originalname,
      path: filePath,
      timestamp: new Date().toISOString(),
    });

    return res.json({ message: "PDF uploaded and indexed successfully!" });
  } catch (error) {
    console.error("❌ Error processing PDF:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Function to List All Uploaded Files
function listUploadedFiles(req, res) {
  return res.json({ files: uploadedFiles });
}

module.exports = { uploadPDF, listUploadedFiles };
