const fs = require("fs");
const pdf = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  try {
    const pdfBuffer = fs.readFileSync(filePath);
    const data = await pdf(pdfBuffer);
    console.log("📜 Extracted Text:", data.text);

    return data.text.trim();
  } catch (error) {
    console.error("❌ PDF Parsing Error:", error);
    return null;
  }
}

module.exports = { extractTextFromPDF };
