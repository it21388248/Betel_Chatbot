const axios = require("axios");
const { getEmbedding } = require("../utils/embeddings");
const { getIndex } = require("../config/pinecone");

async function chatWithGPT(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // ✅ Hardcoded short greetings (bypass RAG)
    const greetingResponses = {
      hi: "👋 Hello! I’m BetelBrio — your assistant for betel market insights.",
      hello: "Hi there! How can I assist you in the betel business today?",
      hey: "Hey! BetelBrio here — ready to help you grow and sell better!"
    };

    const lowerMessage = message.toLowerCase().trim();
    if (greetingResponses[lowerMessage]) {
      return res.json({ reply: greetingResponses[lowerMessage] });
    }

    // 🧠 Generate embedding for user query
    const queryEmbedding = await getEmbedding(message);
    if (!queryEmbedding) return res.status(500).json({ error: "Failed to generate embedding" });

    // 🔍 Search for context in Pinecone (Strictly from KB)
    const index = getIndex();
    const context = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    // 📚 Extract KB context
    const contextText = context.matches.length
      ? context.matches.map((m) => m.metadata.text).join("\n")
      : "";

    // ⚠️ No relevant KB data found
    if (!contextText.trim()) {
      return res.json({ reply: "⚠️ I can only answer based on the uploaded knowledge base. No relevant information was found." });
    }

    // 💬 Get AI response strictly from KB context
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are BetelBrio, an assistant who answers strictly based on the knowledge base context. If no answer is found, reply 'I don't know.'"
          },
          {
            role: "user",
            content: `Question: ${message}\n\nContext: ${contextText}`
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { chatWithGPT };
