/* const express = require("express");
const multer = require("multer");
const { uploadPDF } = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadPDF);

module.exports = router;
 */

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadPDF, listUploadedFiles } = require("../controllers/fileController");

const router = express.Router();

// Ensure "uploads" directory exists before using Multer
const UPLOADS_DIR = "uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Upload PDF Route
router.post("/upload", upload.single("file"), uploadPDF);

// ✅ List Uploaded PDFs Route
router.get("/list", listUploadedFiles);

module.exports = router;
