import axios from "axios";


export const getApi = async (url) => {
  console.log("📡 Fetching from:", url);
  try {
    const response = await axios.get(url);
    console.log("✅ API success:", response);
    return response;
  } catch (error) {
    console.error("❌ API error:", error);
    throw error; // better to throw so React Query can handle it
  }
};


