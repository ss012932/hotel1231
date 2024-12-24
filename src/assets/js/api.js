import axios from "axios";

// 創建 Axios 實例
const apiClient = axios.create({
  baseURL: "https://localhost:7107/api", // 後端 API 的根路徑
  headers: {
    "Content-Type": "application/json",
  },
});

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
