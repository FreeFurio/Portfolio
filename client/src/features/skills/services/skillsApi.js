import apiClient from '../../../shared/api/apiClient.js';

export async function getSkills() {
  const res = await apiClient.get('/api/skills');
  return res.data.data;
}
