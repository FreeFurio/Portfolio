import apiClient from '../../../shared/api/apiClient.js';

export async function sendMessage(data) {
  const res = await apiClient.post('/api/contact', data);
  return res.data;
}
