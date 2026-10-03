import apiClient from '../../../shared/api/apiClient.js';

export async function getProjects() {
  const res = await apiClient.get('/api/projects');
  return res.data.data;
}
