import Axios from "axios";

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000 * 60, // 1 minute
  timeoutErrorMessage: "Request timed out",
});
