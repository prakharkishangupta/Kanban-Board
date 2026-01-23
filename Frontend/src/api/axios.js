import axios from "axios";

const api = axios.create({
  baseURL: "https://kanban-board-ovjh.onrender.com/api",
  withCredentials: true
});

export default api;
