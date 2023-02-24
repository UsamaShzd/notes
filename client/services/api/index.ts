import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

const axiosInstance = axios.create({
  baseURL,
});

const methods = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default methods;
