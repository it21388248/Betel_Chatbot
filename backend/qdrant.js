const { QdrantClient } = require("@qdrant/js-client-rest");

const qdrant = new QdrantClient({
  url: "https://d8b19ada-0fd7-4663-bbef-60ec2b8b6519.eu-west-2-0.aws.cloud.qdrant.io", // Set the correct Qdrant Cloud URL
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.kP3_pglM2eKzvVRBjW0GVaLqjEIv_jK7Sh0tohsbSo", // Set your API key
});

module.exports = qdrant;
