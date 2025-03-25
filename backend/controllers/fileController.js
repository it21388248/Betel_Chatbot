const fs = require("fs");
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
