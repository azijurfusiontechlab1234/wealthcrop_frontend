import axios from "axios";

const token = localStorage.getItem("token")

export const getApi = async (url) => {
  console.log(" Fetching from:", url);
  try {
    const response = await axios.get(url);
    console.log(" API success:", response);
    return response?.data;
  } catch (error) {
    console.error(" API error:", error);
    throw error; // better to throw so React Query can handle it
  }
};

export const getApiWithToken = async (url) => {
  try{
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json"
      }
    })
    return response;
  } catch (error) {
    console.log("API error", error)
  }
}

export const postApi = async (url, data) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type" : "application/json",
      },
    })

    return res;
  } catch (error) {
    return error;
  }
}


