// scripts/checkVector.js
require("dotenv").config();
const { getIndex } = require("../config/pinecone");

(async () => {
  try {
    const index = getIndex();
    const result = await index.fetch(["ea742e67-acc5-46e6-9786-2fd301030725"]);
    console.log("✅ Fetch result:\n", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Error fetching vector:", error);
  }
})();

/* PS D:\Betel_Chatbot\backend>        node scripts/checkVector.js   
>>
✅ Fetch result:   
 {
  "records": {},  
  "namespace": "",
  "usage": {      
    "readUnits": 1
  }
} */

/*   "records": {} → ✅ No vector was found → it’s successfully deleted from Pinecone.

"readUnits": 1 → You were charged 1 read unit (from the free quota) for the lookup. */
