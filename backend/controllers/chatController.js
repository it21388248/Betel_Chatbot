const axios = require("axios");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");

async function chatWithGPT(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Generate embedding for user query
    const queryEmbedding = await getEmbedding(message);
    if (!queryEmbedding) return res.status(500).json({ error: "Failed to generate embedding" });

    // Search for context in Pinecone
    const index = getIndex();
    const context = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    const contextText = context.matches.length
      ? context.matches.map((m) => m.metadata.text).join("\n")
      : "No relevant context found.";

    // Get AI Response from GPT-4o-mini
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful chatbot." },
          { role: "user", content: message + "\nContext: " + contextText },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      }
    );

    return res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { chatWithGPT };
