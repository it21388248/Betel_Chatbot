const fs = require("fs");
const path = require("path");
const { extractTextFromPDF } = require("../utils/extractText");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");

const UPLOADS_DIR = "uploads/";

// ✅ Ensure "uploads/" directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ✅ Initialize uploaded files list from disk
let uploadedFiles = [];

// 📌 Load existing files from disk when the server starts
function loadUploadedFiles() {
  uploadedFiles = fs.readdirSync(UPLOADS_DIR).map((filename) => ({
    filename,
    path: path.join(UPLOADS_DIR, filename),
    timestamp: fs.statSync(path.join(UPLOADS_DIR, filename)).mtime.toISOString(),
  }));
  console.log(`🔄 Loaded ${uploadedFiles.length} existing files from disk.`);
}

// ✅ Call this function to populate `uploadedFiles` at startup
loadUploadedFiles();

// ✅ Upload PDF Function
async function uploadPDF(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let originalFilename = req.file.originalname.trim();
    let sanitizedFilename = originalFilename.replace(/\s+/g, "_"); // ✅ Replace spaces with underscores

    const filePath = path.join(UPLOADS_DIR, sanitizedFilename);

    // ✅ Rename uploaded file to sanitized name
    fs.renameSync(req.file.path, filePath);

    console.log("📌 Saved file as:", sanitizedFilename);

    // ✅ Extract text from the PDF
    const extractedText = await extractTextFromPDF(filePath);
    if (!extractedText || extractedText.length === 0) {
      return res.status(400).json({ error: "No text found in PDF." });
    }

    // ✅ Generate embedding
    const embedding = await getEmbedding(extractedText);
    if (!embedding || embedding.length !== 1536) {
      return res.status(400).json({ error: "Embedding generation failed" });
    }

    console.log("📌 Uploading to Pinecone, Embedding Length:", embedding.length);

    // ✅ Store the embedding in Pinecone
    const index = getIndex();
    if (!index) {
      return res.status(500).json({ error: "Pinecone index not found" });
    }

    await index.upsert([
      {
        id: sanitizedFilename, // ✅ Use sanitized filename as unique identifier
        values: embedding,
        metadata: {
          text: extractedText,
          filename: sanitizedFilename,
          timestamp: Date.now(),
        },
      },
    ]);

    // ✅ Store metadata in memory
    uploadedFiles.push({
      filename: sanitizedFilename,
      path: filePath,
      timestamp: new Date().toISOString(),
    });

    return res.json({ message: "PDF uploaded and indexed successfully!", filename: sanitizedFilename });
  } catch (error) {
    console.error("❌ Error processing PDF:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ List Uploaded Files (Persists After Server Restart)
function listUploadedFiles(req, res) {
  return res.json({ files: uploadedFiles });
}

// ✅ Export functions
module.exports = { uploadPDF, listUploadedFiles };
