import api from "./api";

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
