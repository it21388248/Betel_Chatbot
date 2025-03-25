// backend/scripts/createCollection.js
const qdrant = require("../qdrant");

(async () => {
  await qdrant.createCollection("rag-collection", {
    vectors: { size: 1536, distance: "Cosine" }, // Assuming DeepSeek embedding size
  });
  console.log("Collection created successfully!");
})();
