const { Pinecone } = require("@pinecone-database/pinecone");

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "quickstart"; // ✅ Ensure this matches your Pinecone index name
const EMBEDDING_DIMENSION = 1536; // ✅ Match GPT-4o-mini embeddings

async function initializePinecone() {
  try {
    // Fetch existing indexes
    const existingIndexes = await pinecone.listIndexes();
    const indexNames = existingIndexes.indexes.map((idx) => idx.name);

    if (indexNames.includes(indexName)) {
      console.log(`✅ Using existing Pinecone index: "${indexName}"`);
    } else {
      // Create index only if it does not exist
      console.log(
        `✅ Creating new Pinecone index with dimension ${EMBEDDING_DIMENSION}...`
      );
      await pinecone.createIndex({
        name: indexName,
        dimension: EMBEDDING_DIMENSION,
        metric: "cosine",
        spec: { serverless: { cloud: "aws", region: "us-east-1" } },
      });

      console.log(`✅ Pinecone index "${indexName}" created successfully.`);
    }
  } catch (error) {
    console.error("❌ Error initializing Pinecone:", error);
  }
}

module.exports = {
  initializePinecone,
  getIndex: () => pinecone.index(indexName),
};
