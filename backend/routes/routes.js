router.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;

    // Generate query embedding
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        input: query,
        model: "text-embedding-ada-002",
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    const queryEmbedding = response.data.data[0].embedding;

    // Search Quadrant for similar content
    const searchResults = await axios.post(
      "https://quadrant-api-url.com/search",
      {
        embedding: queryEmbedding,
        topK: 5,
      },
      {
        headers: { Authorization: `Bearer ${process.env.QUADRANT_API_KEY}` },
      }
    );

    const context = searchResults.data.map((r) => r.text).join("\n");

    // Use Deepseek AI for response generation
    const aiResponse = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an AI chatbot trained on uploaded documents.",
          },
          { role: "user", content: `${context}\n\nQuestion: ${query}` },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}` },
      }
    );

    res.json({ reply: aiResponse.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
