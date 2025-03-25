const axios = require("axios");

async function getEmbedding(text) {
  try {
    if (!text || text.length === 0) {
      throw new Error("No valid text provided for embedding.");
    }

    // Ensure text size does not exceed OpenAI’s limit
    const MAX_TOKENS = 4096; // Adjust if needed
    const trimmedText = text.substring(0, MAX_TOKENS);

    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-ada-002", // Make sure model is correct
        input: trimmedText,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      throw new Error("Invalid response from OpenAI Embedding API");
    }

    const embedding = response.data.data[0].embedding;
    console.log("📌 Generated Embedding Length:", embedding.length);
    return embedding;
  } catch (error) {
    console.error("❌ Embedding generation failed:", error.message);
    return []; // Return an empty array instead of null to prevent app crashes
  }
}

module.exports = { getEmbedding };
