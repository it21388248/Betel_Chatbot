const fs = require("fs");
const path = require("path");
const { extractTextFromPDF } = require("../utils/extractText");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");
const { v4: uuidv4 } = require("uuid");

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
    timestamp: fs
      .statSync(path.join(UPLOADS_DIR, filename))
      .mtime.toISOString(),
  }));
  console.log(`🔄 Loaded ${uploadedFiles.length} existing files from disk.`);
}

// ✅ Call this function to populate `uploadedFiles` at startup
loadUploadedFiles();

// ✅ Upload PDF Function (Extract Text, Get Embedding, Index in Pinecone)
async function uploadPDF(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const originalFilename = req.file.originalname.trim();
    const sanitizedFilename = originalFilename.replace(/\s+/g, "_");
    const fileId = uuidv4(); // ✅ Unique ID for this file
    const filePath = path.join(UPLOADS_DIR, sanitizedFilename);
    fs.renameSync(req.file.path, filePath);

    const extractedText = await extractTextFromPDF(filePath);
    const embedding = await getEmbedding(extractedText);

    const index = getIndex();
    await index.upsert([
      {
        id: fileId,
        values: embedding,
        metadata: {
          text: extractedText,
          filename: sanitizedFilename,
          timestamp: Date.now(),
        },
      },
    ]);

    uploadedFiles.push({
      id: fileId,
      filename: sanitizedFilename,
      path: filePath,
      timestamp: new Date().toISOString(),
    });

    return res.json({ message: "File uploaded and indexed", id: fileId });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ List Uploaded Files (Persists After Server Restart)
function listUploadedFiles(req, res) {
  return res.json({ files: uploadedFiles });
}

// ✅ Delete File Function (Removes from Storage & Pinecone)
async function deleteFile(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const fileRecord = uploadedFiles.find((f) => f.id === id);
    if (!fileRecord) return res.status(404).json({ error: "File not found" });

    const index = getIndex();
    await index.deleteOne(id); // ✅ Delete by vector ID

    fs.unlinkSync(fileRecord.path);

    uploadedFiles = uploadedFiles.filter((f) => f.id !== id);

    return res.json({ success: true, message: `File "${fileRecord.filename}" deleted.` });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


// ✅ Export all functions
module.exports = { uploadPDF, listUploadedFiles, deleteFile };
