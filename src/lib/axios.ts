import axios from "axios";
import { API_URL } from "@/config";

const axiosServices = axios.create({ baseURL: API_URL as string, timeout: 10000 });

// Response interceptor — map non-2xx errors to friendly messages
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data;

    // Prefer the server's own friendly message if present
    const serverMessage =
      responseData?.message ||
      responseData?.error ||
      (typeof responseData === "string" ? responseData : null);

    const friendlyMessage =
      serverMessage || "Something went wrong, please try again.";

    // Re-reject with a plain Error so callers can use err.message
    return Promise.reject(
      Object.assign(new Error(friendlyMessage), {
        status: error.response?.status,
        data: responseData,
        type: responseData?.type,
        errors: responseData?.errors,
      })
    );
  }
);

export default axiosServices;
