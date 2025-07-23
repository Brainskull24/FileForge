import axios from "axios";

const api = axios.create({
  baseURL: "https://fileforge-kqev.onrender.com/api/v1",
  withCredentials: true,  
});

export default api;
