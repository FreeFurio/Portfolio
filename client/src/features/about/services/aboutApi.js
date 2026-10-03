import apiClient from '../../../shared/api/apiClient.js';

export async function getAbout() {
  const res = await apiClient.get('/api/about');
  return res.data.data;
}
