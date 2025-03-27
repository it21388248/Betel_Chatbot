const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractTextFromPDF(filePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  const data = await pdf(pdfBuffer);
  return data.text.trim();
}

async function extractTextFromDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value.trim();
}

function extractTextFromPlain(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

// ✅ Main handler
async function extractTextFromFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      case ".pdf":
        return await extractTextFromPDF(filePath);
      case ".docx":
        return await extractTextFromDocx(filePath);
      case ".txt":
      case ".csv":
      case ".xml":
        return extractTextFromPlain(filePath);
      default:
        console.warn(`⚠️ Unsupported file type: ${ext}`);
        return null;
    }
  } catch (error) {
    console.error("❌ File Parsing Error:", error.message);
    return null;
  }
}

module.exports = { extractTextFromFile };
