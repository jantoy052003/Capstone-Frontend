import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:8001/api',
  baseURL: 'https://capstone-laravel-api.onrender.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api