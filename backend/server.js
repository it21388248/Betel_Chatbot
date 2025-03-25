require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pinecone } = require("@pinecone-database/pinecone"); // ✅ Correct Import

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Pinecone Client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY, // ✅ API key from .env file
});

const indexName = "quickstart"; // ✅ Your index name
let index;

(async () => {
  try {
    // Get list of existing indexes
    const existingIndexes = await pinecone.listIndexes();
    const indexNames = existingIndexes.indexes.map((index) => index.name); // ✅ Extract names properly

    if (!indexNames.includes(indexName)) {
      console.log("✅ Creating Pinecone Index...");
      await pinecone.createIndex({
        name: indexName,
        dimension: 2, // Replace with your model dimension (e.g., 1536 for OpenAI embeddings)
        metric: "cosine", // Use cosine similarity
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1", // ✅ Update to your region
          },
        },
      });
      console.log(`✅ Pinecone index "${indexName}" created successfully.`);
    } else {
      console.log(`✅ Using existing Pinecone index: "${indexName}"`);
    }

    // Initialize the index
    index = pinecone.index(indexName);
    console.log("✅ Pinecone initialized and index is ready");
  } catch (error) {
    console.error("❌ Error initializing Pinecone:", error);
  }
})();

// Function to add data to Pinecone
async function addToPinecone(id, text, embedding) {
  try {
    await index.upsert([{ id, values: embedding, metadata: { text } }]);
  } catch (error) {
    console.error("❌ Error adding to Pinecone:", error);
  }
}

// Function to search in Pinecone
async function searchPinecone(vector, topK = 3) {
  try {
    const queryResult = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });
    return queryResult.matches.map((match) => match.metadata.text);
  } catch (error) {
    console.error("❌ Error searching Pinecone:", error);
    return [];
  }
}

// Dummy function to generate embeddings (Replace with AI-based embeddings)
function generateFakeEmbedding(text) {
  return text.split("").map((char) => char.charCodeAt(0) / 1000);
}

// Chatbot API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Generate embedding (Replace with real embeddings)
    const queryEmbedding = generateFakeEmbedding(message);

    // Search for relevant context in Pinecone
    const context = await searchPinecone(queryEmbedding, 3);
    const contextText =
      context.length > 0 ? context.join("\n") : "No relevant context found.";

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use OpenAI's GPT-3.5 Turbo
        messages: [
          { role: "system", content: "You are a helpful chatbot." },
          { role: "user", content: message + "\nContext: " + context },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ Use OpenAI API Key
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Store message in Pinecone
    await addToPinecone(Date.now().toString(), message, queryEmbedding);

    return res.json({ reply });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
