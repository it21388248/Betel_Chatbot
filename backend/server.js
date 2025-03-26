require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { initializePinecone } = require("./config/pinecone");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Pinecone
initializePinecone();

// ✅ Serve uploaded files as static files
app.use("/uploads", express.static("uploads"));
app.use("/api/files", fileRoutes);
app.use("/api/chat", chatRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
