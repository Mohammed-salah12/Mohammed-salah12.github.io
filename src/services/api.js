import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const surveyService = {
  async submit(payload) {
    const { data } = await api.post('/survey', payload);
    return data;
  },
};

export const adminService = {
  async login(credentials) {
    const { data } = await api.post('/admin/login', credentials);
    return data;
  },
  async exportResponses(filters = {}) {
    const { data, headers } = await api.get('/admin/responses/export', {
      params: filters,
      responseType: 'blob',
    });

    const contentDisposition = headers['content-disposition'] || '';
    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);

    return {
      blob: data,
      filename: filenameMatch?.[1] || 'survey-responses.csv',
    };
  },
  async getResponses() {
    const { data } = await api.get('/admin/responses');
    return data;
  },
  async getStats() {
    const { data } = await api.get('/admin/stats');
    return data;
  },
};
