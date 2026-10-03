import apiClient from '../../../shared/api/apiClient.js';

export async function getHero() {
  const res = await apiClient.get('/api/hero');
  return res.data.data;
}
