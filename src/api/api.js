import axios from "axios";
import { toastError } from "../utils/notifyCustom";

const token = localStorage.getItem("token")

export const getApi = async (url) => {
  // console.log(" Fetching from:", url);
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
        "Content-Type": "application/json",
      },
    });

    return res.data; 

  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";

    toastError(errorMessage);  

    return null; 
  }
};

export const postApiWithToken = async (url, data) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
    })
console.log("From post");

    return res?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unknown error occurred';
        toastError(errorMessage);
    return null;
  }
}


