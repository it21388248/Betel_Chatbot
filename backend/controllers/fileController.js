const fs = require("fs");
const path = require("path");
const { extractTextFromFile } = require("../utils/extractText");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");
const { v4: uuidv4 } = require("uuid");

const UPLOADS_DIR = "uploads/";

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

let uploadedFiles = [];

function loadUploadedFiles() {
  uploadedFiles = fs.readdirSync(UPLOADS_DIR).map((filename) => ({
    filename,
    path: path.join(UPLOADS_DIR, filename),
    timestamp: fs
      .statSync(path.join(UPLOADS_DIR, filename))
      .mtime.toISOString(),
    dataSourceName: "Unknown",
  }));
  console.log(`🔄 Loaded ${uploadedFiles.length} existing files from disk.`);
}
loadUploadedFiles();

// ✅ Upload any file type
async function uploadFile(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const dataSourceName = req.body.dataSourceName?.trim();
    if (!dataSourceName) {
      return res.status(400).json({ error: "Data source name is required" });
    }

    const originalFilename = req.file.originalname.trim();
    const sanitizedFilename = originalFilename.replace(/\s+/g, "_");
    const fileId = uuidv4();
    const filePath = path.join(UPLOADS_DIR, sanitizedFilename);
    fs.renameSync(req.file.path, filePath);

    // 🧠 Extract text based on file type
    const extractedText = await extractTextFromFile(filePath);
    if (!extractedText || extractedText.trim().length < 20) {
      return res
        .status(400)
        .json({ error: "This file contains no readable text." });
    }

    const index = getIndex();

    // 🧩 Split and embed
    const chunks = extractedText
      .split(/\n(?=Q:\s)/)
      .map((chunk) => chunk.trim())
      .filter((chunk) => chunk.length > 0);

    for (const chunk of chunks) {
      const chunkId = uuidv4();
      const embedding = await getEmbedding(chunk);

      await index.upsert([
        {
          id: chunkId,
          values: embedding,
          metadata: {
            text: chunk.slice(0, 1000),
            filename: sanitizedFilename,
            fileId,
            dataSourceName,
            timestamp: Date.now(),
          },
        },
      ]);
    }

    uploadedFiles.push({
      id: fileId,
      filename: sanitizedFilename,
      path: filePath,
      dataSourceName,
      timestamp: new Date().toISOString(),
    });

    return res.json({ message: "File uploaded and indexed", id: fileId });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ List uploaded files
function listUploadedFiles(req, res) {
  return res.json({ files: uploadedFiles });
}

// ✅ Delete file
async function deleteFile(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const fileRecord = uploadedFiles.find((f) => f.id === id);
    if (!fileRecord) return res.status(404).json({ error: "File not found" });

    const index = getIndex();
    await index.deleteOne(id);

    fs.unlinkSync(fileRecord.path);
    uploadedFiles = uploadedFiles.filter((f) => f.id !== id);

    return res.json({
      success: true,
      message: `File "${fileRecord.filename}" deleted.`,
    });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  uploadFile, // renamed from uploadPDF
  listUploadedFiles,
  deleteFile,
};
