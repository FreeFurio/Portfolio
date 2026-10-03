import apiClient from '../../../shared/api/apiClient.js';

export const adminApi = {
  updateHero: (data) => apiClient.put('/api/hero', data),

  updateAbout: (data) => apiClient.put('/api/about', data),

  createProject: (data) => apiClient.post('/api/projects', data),
  updateProject: (id, data) => apiClient.put(`/api/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/api/projects/${id}`),
  featureProject: (id) => apiClient.patch(`/api/projects/${id}/feature`),

  updateSkills: (data) => apiClient.put('/api/skills', data),

  getMessages: () => apiClient.get('/api/contact'),
  deleteMessage: (id) => apiClient.delete(`/api/contact/${id}`),
};
