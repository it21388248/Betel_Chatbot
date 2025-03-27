const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  uploadFile,
  listUploadedFiles,
  deleteFile,
} = require("../controllers/fileController");

const router = express.Router();

const UPLOADS_DIR = "uploads/";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, file.originalname.replace(/\s+/g, "_")),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/list", listUploadedFiles);
router.delete("/delete/:id", deleteFile);

module.exports = router;
