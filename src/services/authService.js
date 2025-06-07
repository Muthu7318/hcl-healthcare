import api from './api';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/v1/users/login', credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getStaff: async (data) => {
    const response = await api.post('/v1/staff/readStaff', data);
    return response.data;
  },
    addStaff: async (data) => {
    const response = await api.post('/v1/staff/addStaff', data);
    return response.data;
  },
  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};