import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:8001/api',
  baseURL: 'https://capstone-laravel-api.onrender.com',
  headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    'Access-Control-Allow-Origin':  'postgres://capstone_laravel_api_t9ez_user:JCDpwDHDbyEqyDjnMwNu6plhIB20Y3I1@dpg-cpm48mdds78s738tj8t0-a/capstone_laravel_api_t9ez',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
})

export default api