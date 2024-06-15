import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:8001/api',
  baseURL: 'https://capstone-laravel-api.onrender.com',
  headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
})

export default api