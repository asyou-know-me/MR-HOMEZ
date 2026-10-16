import axios from "axios";

import {
  getAdminToken,
  clearAdminAuth,
} from "../auth/authStorage";


const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL,
});


apiClient.interceptors.request.use(
  (config) => {
    const token =
      getAdminToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401
    ) {
      clearAdminAuth();
    }

    return Promise.reject(error);
  }
);


export default apiClient;