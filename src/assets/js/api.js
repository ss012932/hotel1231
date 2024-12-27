import axios from "axios";

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: "https://localhost:7107/api", // 後端 API 的根路徑
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 支援 Cookies（如果需要）
});

// 添加請求攔截器，用於攜帶 Authorization 標頭
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // 從本地存儲獲取 Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 添加 Authorization 標頭
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 統一的 API 調用方法
export default {
  // GET 請求
  get(endpoint, params = {}) {
    return apiClient.get(endpoint, { params });
  },

  // POST 請求
  post(endpoint, data) {
    return apiClient.post(endpoint, data);
  },

  // PUT 請求
  put(endpoint, data) {
    return apiClient.put(endpoint, data);
  },

  // DELETE 請求
  delete(endpoint) {
    return apiClient.delete(endpoint);
  },
};
