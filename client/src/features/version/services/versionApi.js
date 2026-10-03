import apiClient from '../../../shared/api/apiClient.js';

export async function getVersion() {
  const res = await apiClient.get('/api/version');
  return res.data.data;
}

export async function putVersion(version) {
  const res = await apiClient.put('/api/version', { version });
  return res.data.data;
}
