import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000/api/v1",
  baseURL: "https://fileforge-kqev.onrender.com/api/v1",
  withCredentials: true, 
});

export default api;
